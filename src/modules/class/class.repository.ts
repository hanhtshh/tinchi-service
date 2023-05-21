import { Class } from "../../models";
import { subjectRepository } from "../subject/subject.repository";

class ClassRepository {
  public async findOrCreateClass(condition: any) {
    const result = await Class.create(condition);
    return result;
  }

  public async updateClass(condition: any, id: any) {
    const result = await Class.update(
      {
        ...condition,
      },
      {
        where: {
          id,
        },
      }
    );
    return result;
  }

  public async getClassByQuery(condition: any) {
    const result = await Class.findOne({
      where: condition,
      raw: true,
    });
    return result;
  }

  public async getAllClass(pageSize: number, current: number, name: string) {
    const [classes, total] = await Promise.all([
      Class.findAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
      }),
      Class.count(),
    ]);

    const classesFormat = await Promise.all(
      classes.map(async (classDetail: any) => {
        const subject = await subjectRepository.getSubjectById(
          classDetail.dataValues.subject_id
        );
        if (subject?.name.toUpperCase().includes(name.toUpperCase())) {
          return {
            ...classDetail.dataValues,
            subject,
          };
        }
        return null;
      })
    );

    return [classesFormat.filter((class_check) => class_check != null), total];
  }

  public async getClassById(id: number) {
    const userClass = await Class.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    return userClass;
  }
}

export const classRepository = new ClassRepository();
