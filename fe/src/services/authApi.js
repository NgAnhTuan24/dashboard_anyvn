const BASE_URL = "http://localhost:8080/api/auth";

export async function loginApi(payload) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Đăng nhập thất bại");
  }

  return response.json();
}
