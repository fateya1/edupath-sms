const { login } = useAuth();

async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError(null);

  try {
    await login(email, password);
    navigate("/dashboard", { replace: true });
  } catch (err: any) {
    setError(err.message || "Login failed");
  }
}
