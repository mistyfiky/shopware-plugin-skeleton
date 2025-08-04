import template from "./swag-example.html.twig";
import "./swag-example.scss";

export default Shopware.Component.wrapComponentConfig({
    template,

    computed: {
        sayHello() {
            return "Hello World!";
        },
    },
});
