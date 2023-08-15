import {
    Button,
    Loading,
    Toast,
    Dialog,
    Icon,
    Tag,
    Field,
    DropdownMenu,
    DropdownItem,
    Popup,
    Cell,
    Checkbox,
    CheckboxGroup,
    Picker,
    RadioGroup,
    Radio,
    SwipeCell,
    Tabs,
    Tab,
    Step,
    Steps
} from 'vant';

const components = [
    Button,
    Loading,
    Toast,
    Dialog,
    Icon,
    Tag,
    Field,
    DropdownMenu,
    DropdownItem,
    Popup,
    Cell,
    Checkbox,
    CheckboxGroup,
    Picker,
    RadioGroup,
    Radio,
    SwipeCell,
    Tabs,
    Tab,
    Step,
    Steps
];
const install = function install(Vue) {
    components.forEach(Component => {
        Vue.use(Component);
    });
};
const _default = {
    install
};
export default _default;
