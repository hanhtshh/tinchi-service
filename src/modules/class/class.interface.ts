export interface CLASS_INFO {
  name?: string;
  status?: string;
  max_student?: number;
  tinchi_number?: number;
  total_student?: number;
}

export interface CLASS_INFO_UPDATE {
  name?: string;
  status?: string;
  max_student?: number;
  tinchi_number?: number;
  total_student?: number;
}

export interface ClassServiceInterface {
  getClassInfo(user_id: number): Promise<number>;
}
