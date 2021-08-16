<template>
    <field-container :label="label" :md="md" :label-md="labelMd">
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
                    style="leter-spacing: .025rem; font-size: .75rem; border-radius: 0;"
                    v-bind="vTextField"
                    v-on="on"
                    @click:append="display = !display"
                    @update:error="(e) => error = e"
                    @click:clear="clear()"
                    @input="input($event)"
                    @blur="blur($event)"
                />
                <v-text-field
                    v-else
                    v-bind="vTextField"
                    @update:error="(e) => error = e"
                    @input="input($event)"
                />
            </template>
            <v-card flat>
                <v-card-text class="pa-0 ma-0 container-date-rangepicker">
                    <v-date-picker
                        :key="Math.random().toString(36).substring(7)"
                        v-model="date"
                        class="first-range-calendar"
                        v-bind="vDatePicker"
                        :picker-date.sync="picker_date.start"
                        :min="minInputCalendar"
                        :max="maxOfMonth"
                        :next-icon="null"
                        @input="dateSelected"
                        @update:picker-date="updatePickerDate($event, 'start')"
                    />
                    <v-date-picker
                        :key="Math.random().toString(36).substring(7)"
                        v-model="date"
                        v-bind="vDatePicker"
                        class="second-range-calendar"
                        :prev-icon="null"
                        :picker-date.sync="picker_date.end"
                        :min="minOfMonth"
                        :max="max"
                        @input="dateSelected"
                        @update:picker-date="updatePickerDate($event, 'end')"
                    />
                </v-card-text>
                <v-card-actions class="pt-1">
                    <v-btn
                        color="primary"
                        rounded
                        class="text-capitalize"
                        elevation="0"
                        @click="prosesBtnPilih"
                    >
                        Pilih
                    </v-btn>
                    <span class="ml-2 caption">
                        {{ value && value.length ? dateFormat(value).join(' - ') : null }}
                    </span>
                </v-card-actions>
            </v-card>
        </v-menu>
    </field-container>
</template>

<script src="./DateRangePickerField.js"></script>

<style src="./DateRangePickerField.scss" lang="scss" scoped></style>

<docs>
    Tampilan standard
    ```vue
    <date-range-picker-field label="Date" />
    ```

    Tampilan required
    ```vue
    <date-range-picker-field label="Date" required />
    ```

    Tampilan tanpa label
    ```vue
    <date-range-picker-field />
    ```
</docs>
