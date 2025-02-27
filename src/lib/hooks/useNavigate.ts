export function useNavigate() {
  return (url: string) => {
    window.location.href = url;
  };
} 