export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  const notification_type = searchParams.get('notification_type') || '';

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  try {
    let url = `${API_URL}?limit=${limit}&page=${page}`;
    if (notification_type) {
      url += `&notification_type=${notification_type}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return Response.json(
        { error: `API returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
