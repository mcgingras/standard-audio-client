import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TapeForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.tape?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="owner"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner
        </Label>
        <TextField
          name="owner"
          defaultValue={props.tape?.owner}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="owner" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.tape?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="capacity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Capacity
        </Label>
        <TextField
          name="capacity"
          defaultValue={props.tape?.capacity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="capacity" className="rw-field-error" />

        <Label
          name="quality"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quality
        </Label>
        <TextField
          name="quality"
          defaultValue={props.tape?.quality}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="quality" className="rw-field-error" />

        <Label
          name="style"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Style
        </Label>
        <TextField
          name="style"
          defaultValue={props.tape?.style}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="style" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TapeForm
