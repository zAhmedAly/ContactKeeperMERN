import React, { useContext } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelopeOpen, FaTrashAlt, FaEdit } from 'react-icons/fa';
import ContactContext from '../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    deleteLoading,
    setCurrent,
    clearCurrent,
  } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    {
      /*document.getElementById(`card${_id}`).scrollIntoView(); */
    }
  };

  const onUpdate = () => {
    setCurrent(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card
      id={`card${_id}`}
      style={{
        margin: '0.5rem 0',
        padding: '0.5rem 1rem',
        backgroundColor: '#f4f4f4',
      }}
    >
      {/* <Card.Body> */}
      <Card.Title style={{ marginBottom: '0' }}>
        <h5
          style={{
            color: 'darkblue',
            fontWeight: 'bold',
            alignContent: 'center',
            justifyContent: 'center',
            margin: '0.5rem 0',
          }}
        >
          {name}{' '}
          <Badge
            style={{
              float: 'right',
              padding: 'auto 0.7rem',
              textAlign: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              // margin: '0 0.3rem',
              borderRadius: '5px',
              height: '1.3rem',
              fontSize: '0.8rem',
              verticalAlign: 'middle',
            }}
            variant={type === 'professional' ? 'success' : 'primary'}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </h5>
      </Card.Title>

      <Card.Text style={{ marginBottom: '0.5rem' }}>
        <FaEnvelopeOpen /> {email}
      </Card.Text>
      <Card.Text style={{ marginBottom: '0.5rem' }}>
        <FaPhone /> {phone}
      </Card.Text>
      <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
        <Button
          variant='primary'
          size='sm'
          style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            margin: '0 0.2rem',
          }}
          onClick={onUpdate}
        >
          <FaEdit
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          />
          {/* <strong>Edit</strong> */}
        </Button>
        <Button
          variant='danger'
          size='sm'
          style={{
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            margin: '0 0.2rem',
          }}
          disabled={deleteLoading}
          onClick={onDelete}
        >
          <FaTrashAlt
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          />

          {/* {!deleteLoading ? (
            <FaTrashAlt
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            />
          ) : (
            <>
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='sr-only'>Loading...</span>
            </>
          )} */}

          {/* // <strong>Delete</strong> */}
        </Button>
      </div>
      {/* </Card.Body> */}
    </Card>
  );
};

export default ContactItem;
