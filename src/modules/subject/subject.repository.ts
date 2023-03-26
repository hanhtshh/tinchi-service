import { Subject } from "../../models";
import { SubjectCreateAttributes } from "../../models/subject.model";
class SubjectRepository {
  public async findOrCreateSubject(condition: any) {
    const result = await Subject.create(condition);
    return result;
  }

  public async getSubjectByQuery(condition: any) {
    const result = await Subject.findOne({
      where: condition,
    });
    return result;
  }

  public async getAllSubject(pageSize: number, current: number) {
    const [subjects, totalRows] = await Promise.all([
      Subject.findAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
      }),
      Subject.count({}),
    ]);

    return [subjects, totalRows];
  }

  public async getSubjectById(id: number) {
    const subject = await Subject.findOne({
      where: {
        id: id,
      },
    });
    return subject;
  }

  public async updateSubjectById(
    id: number,
    subjectInfo: SubjectCreateAttributes
  ) {
    const result = await Subject.update(
      {
        name: subjectInfo.name,
        tinchi_number: subjectInfo.tinchi_number,
      },
      {
        where: {
          id,
        },
      }
    );
    return result;
  }
}

export const subjectRepository = new SubjectRepository();
