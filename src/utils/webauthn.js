/**
 * WebAuthn (Passkeys / Biometric Authentication) Utility
 * 
 * Uses browser-native WebAuthn API (PublicKeyCredential) for biometric login
 * (Windows Hello, Face ID, Touch ID, Android Biometrics).
 * 
 * NOTE: Raw biometric data (fingerprint, face template) is NEVER stored or sent to the site.
 * WebAuthn operates strictly via public-key cryptography within the device hardware enclave.
 */

const WEBAUTHN_STORAGE_KEY = 'legacy_vehicle_hub_webauthn_cred_v1';

// Helper: Convert ArrayBuffer / Uint8Array to Base64URL string
function bufferToBase64URL(buffer) {
  const bytes = new Uint8Array(buffer);
  let string = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    string += String.fromCharCode(bytes[i]);
  }
  return btoa(string)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Helper: Convert Base64URL string back to Uint8Array
function base64URLToBuffer(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

/**
 * Checks if the current browser and device support WebAuthn platform biometrics
 */
export async function isWebAuthnSupported() {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) {
    return false;
  }
  try {
    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    }
    return true;
  } catch (e) {
    console.warn('Error checking platform authenticator availability:', e);
    return false;
  }
}

/**
 * Checks if a biometric credential is currently registered on this device
 */
export function hasRegisteredBiometric() {
  try {
    const cred = localStorage.getItem(WEBAUTHN_STORAGE_KEY);
    return !!cred;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieves registered credential metadata (credentialId, username, createdAt)
 */
export function getRegisteredBiometricInfo() {
  try {
    const stored = localStorage.getItem(WEBAUTHN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Registers a new WebAuthn biometric credential for the admin on this device.
 * Triggers native Windows Hello / Touch ID / Face ID prompt.
 */
export async function registerBiometricCredential(username = 'admin') {
  const supported = await isWebAuthnSupported();
  if (!supported) {
    throw new Error('Biometric authentication is not supported or enabled on this browser or device.');
  }

  // Generate 32-byte cryptographic challenge
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  // User ID buffer
  const userId = new TextEncoder().encode(username.toLowerCase());

  const publicKeyCredentialCreationOptions = {
    challenge: challenge.buffer,
    rp: {
      name: 'Legacy Vehicle Hub',
      id: window.location.hostname
    },
    user: {
      id: userId.buffer,
      name: username.toLowerCase(),
      displayName: `Admin (${username})`
    },
    pubKeyCredParams: [
      { alg: -7, type: 'public-key' },  // ES256
      { alg: -257, type: 'public-key' } // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform', // Windows Hello, Touch ID, Face ID
      userVerification: 'required',
      residentKey: 'preferred'
    },
    timeout: 60000,
    attestation: 'none'
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions
    });

    if (!credential) {
      throw new Error('Credential registration was canceled or failed.');
    }

    const credentialIdStr = bufferToBase64URL(credential.rawId);

    const credentialMetadata = {
      id: credentialIdStr,
      rawId: credentialIdStr,
      type: credential.type,
      username: username.toLowerCase(),
      registeredAt: new Date().toISOString(),
      deviceName: getDeviceName()
    };

    localStorage.setItem(WEBAUTHN_STORAGE_KEY, JSON.stringify(credentialMetadata));
    return { success: true, metadata: credentialMetadata };
  } catch (err) {
    console.error('WebAuthn Registration Error:', err);
    if (err.name === 'NotAllowedError') {
      throw new Error('Biometric registration was canceled or timed out.');
    }
    throw new Error(err.message || 'Failed to register biometric authentication.');
  }
}

/**
 * Authenticates using native biometrics (Windows Hello / Touch ID / Face ID)
 */
export async function authenticateBiometric() {
  const supported = await isWebAuthnSupported();
  if (!supported) {
    throw new Error('Biometric authentication is not supported on this device/browser.');
  }

  const storedInfo = getRegisteredBiometricInfo();
  if (!storedInfo || !storedInfo.id) {
    throw new Error('No biometric credential found for this device. Please log in with your password first and register your device in Settings.');
  }

  // Generate challenge
  const challenge = new Uint8Array(32);
  window.crypto.getRandomValues(challenge);

  const credentialIdBuffer = base64URLToBuffer(storedInfo.id);

  const publicKeyCredentialRequestOptions = {
    challenge: challenge.buffer,
    allowCredentials: [
      {
        id: credentialIdBuffer,
        type: 'public-key',
        transports: ['internal']
      }
    ],
    userVerification: 'required',
    timeout: 60000
  };

  try {
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });

    if (!assertion) {
      throw new Error('Biometric verification failed.');
    }

    return {
      success: true,
      username: storedInfo.username || 'admin',
      credentialId: storedInfo.id
    };
  } catch (err) {
    console.error('WebAuthn Authentication Error:', err);
    if (err.name === 'NotAllowedError') {
      throw new Error('Biometric login was canceled or timed out. Please try again.');
    }
    throw new Error(err.message || 'Biometric authentication failed.');
  }
}

/**
 * Removes registered biometric credential from this device
 */
export function removeBiometricCredential() {
  try {
    localStorage.removeItem(WEBAUTHN_STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Helper to identify user OS / Device for friendly UI display
 */
function getDeviceName() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows Device (Windows Hello)';
  if (userAgent.includes('Mac')) return 'Mac / Apple Device (Touch ID / Face ID)';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS Device (Face ID / Touch ID)';
  if (userAgent.includes('Android')) return 'Android Device (Fingerprint / Face)';
  return 'Personal Authenticator Device';
}
