<template>
    <field-container :label="label" :md="md">
        <template #label>
            <!-- @slot Label field -->
            <slot name="label" v-bind="{ label, required, error: error || !!errorMessages }">
                <div class="mt-2">
                    <label :class="{ 'error--text': error || !!errorMessages }">{{ label }}</label>
                    <v-tooltip v-if="required" right>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                x-small
                                color="red"
                                v-on="on"
                            >
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

        <v-menu
            v-model="display"
            v-bind="vMenu"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-if="!readonly || !disabled"
                    ref="textField"
                    v-bind="vTextField"
                    v-on="on"
                    @click:append="display = !display"
                    @update:error="(e) => error = e"
                    @click:clear="clear()"
                    @input="input($event)"
                    @blur="blur()"
                />
                <v-text-field
                    v-else
                    v-bind="vTextField"
                    @update:error="(e) => error = e"
                    @input="input($event)"
                />
            </template>

            <v-radio-group
                v-model="checked"
                class="ma-0 pa-0"
                hide-details
                @change="change()"
            >
                <v-list dense>
                    <v-list-group
                        v-for="(item, index) in initItems"
                        :key="index"
                        v-model="item.active"
                        no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-action>
                                <v-radio
                                    color="primary"
                                    :value="item[itemValue]"
                                />
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title v-text="item[itemText]" />
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            v-for="subItem in item[childName]"
                            :key="subItem.title"
                        >
                            <v-list-item-action>
                                <v-radio
                                    color="primary"
                                    :value="subItem[childValue]"
                                />
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title v-text="subItem[childText]" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-radio-group>
        </v-menu>
    </field-container>
</template>

<script src="./MultiLevelSelectField.js"></script>

<style scoped>

</style>

<docs>
    Tampilan standard
    ```vue
    <multi-level-select-field label="Time" />
    ```

    Tampilan required
    ```vue
    <multi-level-select-field label="Time" required />
    ```

    Tampilan tanpa label
    ```vue
    <multi-level-select-field />
    ```
</docs>
