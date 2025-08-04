import { shallowMount, flushPromises } from "@vue/test-utils";

Shopware.Component.register(
    "swag-example",
    () => import("../../../src/component/swag-example"),
);

async function createWrapper() {
    return shallowMount(await Shopware.Component.build("swag-example"), {});
}

describe("src/component/swag-example", () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = await createWrapper();

        await flushPromises();
    });

    afterEach(async () => {
        if (wrapper) {
            await wrapper.unmount();
        }

        await flushPromises();
    });

    it("should be a Vue.js component", () => {
        expect(wrapper.vm).toBeTruthy();
    });

    it("should show text", () => {
        expect(wrapper.vm.sayHello).toBe("Hello World!");
    });
});
