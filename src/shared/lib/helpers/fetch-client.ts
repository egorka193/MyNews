export const fetchClient = async <T>(
  url: string,
  params: RequestInit & { params?: Record<string, string> } = {}
) => {
  const urlParams = new URLSearchParams(params?.params);
  const urlWithParams =
    Object.keys(params?.params || {}).length > 0
      ? `${url}?${urlParams.toString()}`
      : url;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const fullUrl = `${baseUrl}${urlWithParams}`;

  const response = await fetch(fullUrl, {
    ...params,
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { data: data as T, response };
};