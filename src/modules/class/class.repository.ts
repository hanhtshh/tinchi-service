import { Class } from "../../models";
class ClassRepository {
  public async findOrCreateClass(condition: any) {
    const result = await Class.create(condition);
    return result;
  }

  public async getClassByQuery(condition: any) {
    const result = await Class.findOne({
      where: condition,
    });
    return result;
  }

  public async getAllClass(pageSize: number, current: number) {
    const [classes, totalRows] = await Promise.all([
      Class.findAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
      }),
      Class.count({}),
    ]);

    return [classes, totalRows];
  }
}

export const classRepository = new ClassRepository();
