export class AlreadyExists extends Error {
	constructor() {
		super("Short Link Already Exists")
	}
}
