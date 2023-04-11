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

  public async getAllClass(pageSize: number, current: number, name: string) {
    const [classes] = await Promise.all([
      Class.findAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
      }),
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

    return [
      classesFormat.filter((class_check) => class_check != null),
      classesFormat.length,
    ];
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
