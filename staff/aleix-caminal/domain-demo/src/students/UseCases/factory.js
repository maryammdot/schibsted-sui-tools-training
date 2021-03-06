import ListStudentsUseCase from './ListStudentsUseCase'
import StudentsRepositoriesFactory from '../Repositories/factory'
import SearchByNameStudentsUseCase from './SearchByNameStudentsUseCase'

class StudentsUseCasesFactory {
  static listStudentsUseCase = ({config}) =>
    new ListStudentsUseCase({
      config,
      repository: StudentsRepositoriesFactory.httpStudentsRepository({config})
    })

  static searchByNameStudentsUseCase = ({config}) =>
    new SearchByNameStudentsUseCase({
      config,
      repository: StudentsRepositoriesFactory.httpStudentsRepository({config})
    })
}

export default StudentsUseCasesFactory
