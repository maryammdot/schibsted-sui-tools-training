import { UseCase } from "@s-ui/domain";

class GetPopularsUseCase extends UseCase {
    
  constructor({ config, repository }) {
    super();
    this._config = config;
    this._repository = repository;
  }

  async execute(page = 1) {
    const result = await this._repository.getPopulars(page);
    return result.toJSON()
  }
}

export default GetPopularsUseCase;