import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export type AuthUser = { id: number; email: string };

export function useAuth() {
  const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery<AuthUser | null>({
        queryKey: ["/api/auth/me"],
            queryFn: async () => {
                  const res = await fetch("/api/auth/me");
                        if (res.status === 401) return null;
                              if (!res.ok) throw new Error("Failed to fetch user");
                                    return res.json();
                                        },
                                            staleTime: 5 * 60 * 1000,
                                                retry: false,
                                                  });

                                                    const loginMutation = useMutation({
                                                        mutationFn: async (data: { email: string; password: string }) => {
                                                              const res = await apiRequest("POST", "/api/auth/login", data);
                                                                    return res.json();
                                                                        },
                                                                            onSuccess: (user) => {
                                                                                  queryClient.setQueryData(["/api/auth/me"], user);
                                                                                        queryClient.invalidateQueries();
                                                                                            },
                                                                                              });

                                                                                                const registerMutation = useMutation({
                                                                                                    mutationFn: async (data: { email: string; password: string }) => {
                                                                                                          const res = await apiRequest("POST", "/api/auth/register", data);
                                                                                                                return res.json();
                                                                                                                    },
                                                                                                                        onSuccess: (user) => {
                                                                                                                              queryClient.setQueryData(["/api/auth/me"], user);
                                                                                                                                    queryClient.invalidateQueries();
                                                                                                                                        },
                                                                                                                                          });

                                                                                                                                            const logoutMutation = useMutation({
                                                                                                                                                mutationFn: async () => {
                                                                                                                                                      await apiRequest("POST", "/api/auth/logout");
                                                                                                                                                          },
                                                                                                                                                              onSuccess: () => {
                                                                                                                                                                    queryClient.setQueryData(["/api/auth/me"], null);
                                                                                                                                                                          queryClient.clear();
                                                                                                                                                                              },
                                                                                                                                                                                });

                                                                                                                                                                                  return {
                                                                                                                                                                                      user: user ?? null,
                                                                                                                                                                                          isLoading,
                                                                                                                                                                                              login: loginMutation.mutateAsync,
                                                                                                                                                                                                  register: registerMutation.mutateAsync,
                                                                                                                                                                                                      logout: logoutMutation.mutateAsync,
                                                                                                                                                                                                          loginError: loginMutation.error,
                                                                                                                                                                                                              registerError: registerMutation.error,
                                                                                                                                                                                                                  isLoginPending: loginMutation.isPending,
                                                                                                                                                                                                                      isRegisterPending: registerMutation.isPending,
                                                                                                                                                                                                                        };
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        