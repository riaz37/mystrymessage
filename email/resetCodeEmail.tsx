import React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Text,
} from '@react-email/components';

interface OtpEmailProps {
 otp: string;
}

const resetOtpEmail: React.FC<OtpEmailProps> = ({ otp}) => {
    return (
      <Html>
        <Head />
        <Body style={main}>
          <Container style={container}>
            <Heading style={heading}>Your OTP Code</Heading>
            <Text style={text}>Hello</Text>
            <Text style={text}>Use the following OTP code to reset your password:</Text>
            <Text style={otpCode}>{otp}</Text>
            <Text style={text}>If you did not request this code, please ignore this email.</Text>
            
          </Container>
        </Body>
      </Html>
    );
};

const main: React.CSSProperties = {
  backgroundColor: '#f6f6f6',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
};

const heading: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
};

const text: React.CSSProperties = {
  fontSize: '16px',
  marginBottom: '20px',
};

const otpCode: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const button: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '10px 20px',
  textDecoration: 'none',
  borderRadius: '5px',
};

export default resetOtpEmail;
