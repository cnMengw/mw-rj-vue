import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Hello from '@/components/testHello.vue';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(HelloWorld, {
            propsData: { msg }
        });
        expect(wrapper.text()).to.include(msg);
    });
});
describe('Hello.vue', () => {
    it('renders props.a when passed', () => {
        const a = 11;
        const wrapper = shallowMount(Hello, {
            propsData: { a }
        });
        expect(wrapper.text()).to.include(a);
    });
});
