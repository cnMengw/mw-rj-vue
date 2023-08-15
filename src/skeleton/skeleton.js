import Vue from 'vue';
import skeletonIn from './skeleton-in.vue';
import skeletonOut from './skeleton-out.vue';
import skeletonBusiness from './skeleton-business.vue';

export default new Vue({
    components: {
        skeletonIn,
        skeletonOut,
        skeletonBusiness
    },
    template: `
        <div>
            <skeleton-in id="skeletonIn" style="display:none"/>
            <skeleton-out id="skeletonOut" style="display:none"/>
            <skeleton-business id="skeletonBusiness" style="display:none"/>
        </div>
    `
});
