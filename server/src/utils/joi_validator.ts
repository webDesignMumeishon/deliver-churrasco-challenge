import { ValidationError, ValidationOptions, AnySchema } from 'joi';

export default class Validator<T> {
	private readonly schema: AnySchema;
	private validateOptions: ValidationOptions;
	private error: ValidationError;
	constructor(schema: AnySchema, validateOptions: ValidationOptions = null) {
		this.schema = schema;
		this.validateOptions = validateOptions;
	}
	public validate(data: unknown): data is T {
		this.error = null;
		const { error } = this.schema.validate(data, this.validateOptions);
		if (error === null || error === undefined) {
			return true;
		} else {
			this.error = error;
			return false;
		}
	}
	public getError(): ValidationError {
		return this.error;
	}
}
