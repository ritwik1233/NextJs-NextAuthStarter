export const enable2FA = async () => {
  const response = await fetch("/api/2fa", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to enable 2FA");
  }
  return response.json();
};

export const verify2FA = async (token: string) => {
  const response = await fetch("/api/2fa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to verify 2FA");
  }
  return response.json();
};

export const disable2FA = async () => {
  const response = await fetch("/api/2fa", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to disable 2FA");
  }
  return response.json();
};