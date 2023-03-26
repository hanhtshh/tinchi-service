import { Class } from "../../models";
import { subjectRepository } from "../subject/subject.repository";
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

    const classesFormat = await Promise.all(
      classes.map(async (classDetail: any) => {
        const subject = await subjectRepository.getSubjectById(
          classDetail.dataValues.subject_id
        );
        return {
          ...classDetail.dataValues,
          subject,
        };
      })
    );

    return [classesFormat, totalRows];
  }

  public async getClassById(id: number) {
    const userClass = await Class.findOne({
      where: {
        id: id,
      },
    });
    return userClass;
  }
}

export const classRepository = new ClassRepository();
