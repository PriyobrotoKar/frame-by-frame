export const fetchNewPlaylist = async (src: string, token: string) => {
  try {
    const response = await fetch(src, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.apple.mpegurl',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching new playlist:', error);
  }
};
