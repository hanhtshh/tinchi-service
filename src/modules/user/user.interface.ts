export interface UserServiceInterface {
  getUserInfo(user_id: number): Promise<number>;
}
