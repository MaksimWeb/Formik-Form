import React from "react";
import {Formik, Field, Form, useField, FieldArray} from "formik";
import {Button, Checkbox, FormControlLabel, MenuItem, Radio, Select, TextField} from "@material-ui/core";

// const MyTextField: React.FC<FieldAttributes<{}>> = (props) => {
//     const [field, meta] = useField<{}>(props);
//     const errorText = meta.error && meta.touched ? meta.error: '';
//     return (
//         <TextField {...field} helperText={errorText}/>
//     )
// }

const arr = [
    {name: 'kec', age: 25},
    {name: 'укроп', age: 15},
    {name: 'ржавый', age: 11},
    {name: 'груздь', age: 209}
]

const Forma = () => {
    return (
        <div>
            <Formik initialValues={
                {
                    firstName: 'bob',
                    lastName: 'Connor',
                    isTall: false,
                    cookies: [],
                    yogurt: '',
                    pets: [{type: 'cat', name: 'Jarvis', id: "" + Math.random()}],
                    students: arr
                }
            }
                // validate={(values) => {
                //     const errors = {};
                //
                //     if (values.fistName.includes('bob')) {
                //         errors.firstName = 'no bob'
                //     }
                //     return errors
                // }}

                    onSubmit={(data, {setSubmitting}) => {
                        setSubmitting(true);
                        //make async call
                        console.log(data)
                        setSubmitting(false);

                    }}>
                {({values, isSubmitting, errors}) => (
                    <Form>
                        <Field placeholder="first name" name="firstName" type="input" as={TextField}/>
                        <div>
                            <Field placeholder="last name" name="lastName" type="input" as={TextField}/>
                        </div>

                        <Field name="isTall" type='checkbox' as={Checkbox}/>

                        <div>cookies:</div>
                        <Field name="cookies" type='checkbox' value='chocolate chip' as={Checkbox}/>
                        <Field name="cookies" type='checkbox' value='snickerdoodle' as={Checkbox}/>
                        <Field name="cookies" type='checkbox' value='sugar' as={Checkbox}/>
                        <div>yogurt</div>
                        <label>
                            peach
                            <Field name="yogurt" type='radio' value='peach' as={Radio}/>
                        </label>
                        <label>
                            blueberry
                            <Field name="yogurt" type='radio' value='blueberry' as={Radio}/>
                        </label>
                        <label>
                            apple
                            <Field name="yogurt" type='radio' value='apple' as={Radio}/>
                        </label>

                        <FieldArray name='pets'>
                            {(arrayHelpers) => (
                                <div>
                                    <Button onClick={() => arrayHelpers.push({
                                        type: 'frog',
                                        name: '',
                                        id: "" + Math.random()
                                    })}>add pet</Button>
                                    {values.pets.map((pet, index) => {
                                        return (
                                            <div key={pet.id}>
                                                <Field as={TextField} placeholder='pet name' name={`pets.${index}.name`}/>
                                                <Field name={`pets.${index}.type`} type='select' as={Select}>
                                                    <MenuItem value='cat'>cat</MenuItem>
                                                    <MenuItem value='dog'>dog</MenuItem>
                                                    <MenuItem value='frog'>frog</MenuItem>
                                                </Field>
                                                <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                            }
                        </FieldArray>

                        <FieldArray name='students'>
                            {(arrayHelpers) => (
                                <div>
                                    <Button onClick={() => arrayHelpers.push({
                                        name: '',
                                        age: ''
                                    })}>add student</Button>
                                    {values.students.map((student, index) => {
                                        return (
                                            <div key={student.name}>
                                                <Field as={TextField} placeholder='student name' name={`students.${index}.name`}/>
                                                <Field as={TextField} placeholder='student name' name={`students.${index}.age`}/>

                                                <Button onClick={() => arrayHelpers.remove(index)}>x</Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                            }
                        </FieldArray>

                        <div>
                            <button disabled={isSubmitting} type="submit">submit</button>
                        </div>

                        <pre>
                                 {JSON.stringify(values, null, 2)}
                             </pre>
                        <pre>
                                 {JSON.stringify(errors, null, 2)}
                             </pre>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Forma