<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot
                name="label"
                v-bind="{ label, required, error: error || !!errorMessages }"
            >
                <div class="mt-2">
                    <label :class="{ 'error--text': error || !!errorMessages }">{{
                        label
                    }}</label>
                    <v-tooltip v-if="required" right>
                        <template v-slot:activator="{ on }">
                            <v-btn icon x-small color="red" v-on="on">
                                <v-icon x-small>
                                    mdi-asterisk
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Wajib diisi.</span>
                    </v-tooltip>
                </div>
            </slot>
        </template>

        <v-text-field
            ref="textField"
            :style="{
                'border-radius': tile ? '0px' : '',
                'leter-spacing': '.025rem',
                'font-size': '.75rem'
            }"
            v-bind="vTextField"
            color="#3368AC"
            class="rounded-lg"
            @input="input($event)"
            @keydown="keydown($event)"
            @keydown.enter="enter($event)"
            @blur="blur($event)"
            @click="click($event)"
            @change="change($event)"
        >
            <template v-if="append" #append>
                <p class="caption mt-1 mb-0">
                    {{ append }}
                </p>
            </template>

            <template v-if="appendOuter" #append-outer>
                <span class="caption mt-1 mb-0">
                    {{ appendOuter }}
                </span>
            </template>

            <template #prepend-inner>
                <p
                    v-if="prepend"
                    :class="{ 'caption mt-1 mb-0': !height }"
                    :style="{ color }"
                >
                    {{ prepend }}
                </p>
            </template>

            <template v-if="prependOuter" #prepend>
                <span class="caption mt-1 mb-0">
                    {{ prependOuter }}
                </span>
            </template>
        </v-text-field>

        <template #append-after>
            <!-- @slot komponen untuk ditampilkan setelah field -->
            <slot name="append-after" />
        </template>
    </field-container>
</template>

<script src="./TextField.js"></script>

<style scoped>
</style>

<docs>
    Tampilan standard
    ```vue
    <text-field label="Text" />
    ```

    Tampilan required
    ```vue
    <text-field label="Text" required />
    ```

    Tampilan tanpa label
    ```vue
    <text-field />
    ```
</docs>
