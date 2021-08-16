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

        <v-textarea
            ref="textareaField"
            v-bind="vTextarea"
            color="#3368AC"
            style="leter-spacing: .025rem;font-size: .75rem;"
            :rows="rows"
            @input="input($event)"
            @blur="blur($event)"
            @update:error="e => (error = e)"
        />
    </field-container>
</template>

<script src="./TextareaField.js"></script>

<style scoped>
</style>

<docs>
    Tampilan standard
    ```vue
    <textarea-field label="Textarea" />
    ```

    Tampilan required
    ```vue
    <textarea-field label="Textarea" required />
    ```

    Tampilan tanpa label
    ```vue
    <textarea-field />
    ```
</docs>
