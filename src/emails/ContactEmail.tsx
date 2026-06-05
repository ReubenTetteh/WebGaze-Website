import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service?: string;
  budget?: string;
  message: string;
}

export default function ContactEmail({
  firstName,
  lastName,
  email,
  phone,
  service,
  budget,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact from {firstName} {lastName} — WebGaze</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <div style={redBar} />
            <Text style={brandName}>WEBGAZE</Text>
            <Text style={headerLabel}>New Contact Form Submission</Text>
          </Section>

          {/* Name */}
          <Section style={section}>
            <Heading style={heading}>
              {firstName} {lastName} got in touch
            </Heading>
            <Text style={subtext}>
              Submitted via the Contact page. Respond within 1–2 business days.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Details */}
          <Section style={section}>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Email</Text></Column>
              <Column style={valueCol}><Text style={value}>{email}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Phone</Text></Column>
              <Column style={valueCol}><Text style={value}>{phone || "—"}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Service</Text></Column>
              <Column style={valueCol}><Text style={value}>{service || "—"}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Budget</Text></Column>
              <Column style={valueCol}><Text style={value}>{budget || "—"}</Text></Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Message */}
          <Section style={section}>
            <Text style={label}>Message</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>WebGaze · hello@webgaze.com.au · +61 411 078 843</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f4",
  fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#0f0f0f",
  padding: "32px 40px 28px",
};

const redBar: React.CSSProperties = {
  width: "48px",
  height: "3px",
  backgroundColor: "#E01B24",
  marginBottom: "16px",
};

const brandName: React.CSSProperties = {
  margin: "0 0 4px",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "0.2em",
  color: "#ffffff",
};

const headerLabel: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  color: "#888888",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

const section: React.CSSProperties = {
  padding: "28px 40px",
};

const heading: React.CSSProperties = {
  margin: "0 0 8px",
  fontSize: "22px",
  fontWeight: "700",
  color: "#0f0f0f",
};

const subtext: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  color: "#888888",
  lineHeight: "1.6",
};

const divider: React.CSSProperties = {
  borderColor: "#eeeeee",
  margin: "0 40px",
};

const row: React.CSSProperties = {
  marginBottom: "14px",
};

const labelCol: React.CSSProperties = {
  width: "120px",
};

const valueCol: React.CSSProperties = {};

const label: React.CSSProperties = {
  margin: "0",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#aaaaaa",
};

const value: React.CSSProperties = {
  margin: "0",
  fontSize: "14px",
  color: "#0f0f0f",
  fontWeight: "500",
};

const messageBox: React.CSSProperties = {
  margin: "10px 0 0",
  fontSize: "14px",
  color: "#333333",
  lineHeight: "1.7",
  backgroundColor: "#f9f9f9",
  borderLeft: "3px solid #E01B24",
  padding: "14px 16px",
  borderRadius: "0 6px 6px 0",
};

const footer: React.CSSProperties = {
  backgroundColor: "#f9f9f9",
  padding: "20px 40px",
  borderTop: "1px solid #eeeeee",
};

const footerText: React.CSSProperties = {
  margin: "0",
  fontSize: "12px",
  color: "#aaaaaa",
  textAlign: "center" as const,
};
