
import BaseButton from "./base-button/index.vue";

declare module '@vue/runtime-core'{
    export interface GlobalComponents{
        BaseButton:typeof BaseButton
    }
}