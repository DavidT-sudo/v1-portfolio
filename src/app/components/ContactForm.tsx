'use client';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import contactImg from '@/app/assets/images/contact-img.svg';

function ContactForm() {
  const formInitDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  };

  const [formDetails, setFormDetails] = useState(formInitDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState<{ success: boolean; message: string }>();

  // const onFormUpdate = (category: string, value: string) => {
  //   setFormDetails({
  //     ...formDetails,
  //     [category]: value,
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonText('Sending...');

    const response = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json;charset=utf-8',
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText('Send');
    const result = response.json();
    setFormDetails(formInitDetails);
    if (result.code == 200) {
      setStatus({ success: true, message: 'Message sent successfully' });
    } else {
      setStatus({
        success: false,
        message: 'Something went wrong, Please try again later',
      });
    }
  };

  return (
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Image src={contactImg} alt="Contact Us" width={500} height={500} />
          </Col>
          <Col md={6}>
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formDetails.firstName}
                    onChange={e =>
                      setFormDetails({
                        ...formDetails,
                        firstName: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formDetails.lastName}
                    onChange={e =>
                      setFormDetails({
                        ...formDetails,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formDetails.email}
                    onChange={e =>
                      setFormDetails({
                        ...formDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <input
                    type="number"
                    placeholder="Phone"
                    value={formDetails.phone}
                    onChange={e =>
                      setFormDetails({
                        ...formDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <textarea
                    placeholder="Message"
                    value={formDetails.message}
                    onChange={e =>
                      setFormDetails({
                        ...formDetails,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                  <button type="submit">{buttonText}</button>
                </Col>
                {status?.message && (
                  <Col>
                    <p className={status.success ? 'success' : 'danger'}>
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactForm;
