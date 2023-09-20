import { MODULE_NAME } from "./consts.js";
class Registration {
	nextId = 0;
	wrappers;

	handler(context, wrapped, ...args) {
		let current = wrapped;
		for (const wrapper of this.wrappers.values()) {
			const next = current;
			current = (...args) => wrapper.call(context, next, ...args);
		}
		return current.call(context, ...args);
	}
}

export default class libWrapperShared {
	static registrations;

	static register(target, handler) {
		let registration = this.registrations.get(target);
		if (!registration) {
			registration = new Registration();
			libWrapper.register(MODULE_NAME, target,
				function (this, wrapped, ...args) { return registration.handler(this, wrapped, ...args); }, 'WRAPPER');
			this.registrations.set(target, registration);
		}
		const id = registration.nextId++;
		registration.wrappers.set(id, handler);
		return id;
	}

	static unregister(target, id) {
		const registration = this.registrations.get(target);
		if (!registration) return false;
		registration.wrappers.delete(id);
		if (registration.wrappers.size === 0) {
			libWrapper.unregister(MODULE_NAME, target, false);
			this.registrations.delete(target);
		}
		return true;
	}
}