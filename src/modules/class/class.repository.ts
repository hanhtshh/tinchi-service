import { Class } from "../../models";
class ClassRepository {
  public async findOrCreateClass(condition: any) {
    const result = await Class.findOrCreate({
      where: condition,
    });
    return result;
  }

  public async getClassByQuery(condition: any) {
    const result = await Class.findOne({
      where: condition,
    });
    return result;
  }
}

export const classRepository = new ClassRepository();
