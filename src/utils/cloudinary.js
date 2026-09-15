/**
 * Cloudinary Image Upload Utility
 * Uploads image files directly to Cloudinary using unsigned upload preset.
 */

export const getCloudinaryConfig = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
  
  const isConfigured = Boolean(
    cloudName && 
    uploadPreset && 
    cloudName !== 'your_cloudinary_cloud_name' &&
    uploadPreset !== 'your_unsigned_upload_preset'
  );

  return {
    cloudName,
    uploadPreset,
    isConfigured
  };
};

/**
 * Uploads a single file to Cloudinary.
 * @param {File} file - File object from input element
 * @param {function} [onProgress] - Optional upload progress callback (0-100)
 * @returns {Promise<{success: boolean, url: string, error?: string}>}
 */
export async function uploadImageToCloudinary(file, onProgress = null) {
  const { cloudName, uploadPreset, isConfigured } = getCloudinaryConfig();

  // Fallback to local FileReader base64 if Cloudinary is unconfigured
  if (!isConfigured) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          success: true,
          url: reader.result,
          isFallback: true,
          message: 'Uploaded via local preview (Configure VITE_CLOUDINARY_CLOUD_NAME in .env for Cloudinary hosting)'
        });
      };
      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file locally'
        });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Perform upload with XHR for progress support
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            success: true,
            url: response.secure_url,
            publicId: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height
          });
        } else {
          try {
            const errorRes = JSON.parse(xhr.responseText);
            resolve({
              success: false,
              error: errorRes.error?.message || `Cloudinary upload failed (HTTP ${xhr.status})`
            });
          } catch (e) {
            resolve({
              success: false,
              error: `Upload failed with status ${xhr.status}`
            });
          }
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          error: 'Network error connecting to Cloudinary API'
        });
      };

      xhr.send(formData);
    });
  } catch (err) {
    return {
      success: false,
      error: err.message || 'An unexpected error occurred during image upload'
    };
  }
}
