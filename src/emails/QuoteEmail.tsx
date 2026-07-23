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

interface QuoteEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  message: string;
}

export default function QuoteEmail({
  firstName,
  lastName,
  email,
  phone,
  services,
  budget,
  message,
}: QuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {firstName} {lastName} — WebGaze</Preview>
      <Body style={main}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <div style={redBar} />
            <Text style={brandName}>WEBGAZE</Text>
            <Text style={headerLabel}>New Quote Request</Text>
          </Section>

          {/* Intro */}
          <Section style={section}>
            <Heading style={heading}>
              {firstName} {lastName} wants a proposal
            </Heading>
            <Text style={subtext}>
              Submitted via the Request a Proposal page. Review and respond within 1–2 business days.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Services */}
          <Section style={section}>
            <Text style={label}>Services Requested</Text>
            <div style={tagsWrap}>
              {services.map((s) => (
                <span key={s} style={tag}>{s}</span>
              ))}
            </div>
          </Section>

          <Hr style={divider} />

          {/* Details */}
          <Section style={section}>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Budget</Text></Column>
              <Column style={valueCol}><Text style={valueBold}>{budget}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Email</Text></Column>
              <Column style={valueCol}><Text style={value}>{email}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Phone</Text></Column>
              <Column style={valueCol}><Text style={value}>{phone}</Text></Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Project details */}
          <Section style={section}>
            <Text style={label}>Project Details</Text>
            <Text style={messageBox}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>WebGaze · hello@webgaze.com.au · +61 422 169 233</Text>
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

const tagsWrap: React.CSSProperties = {
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "8px",
};

const tag: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#fff0f0",
  color: "#E01B24",
  fontSize: "12px",
  fontWeight: "600",
  padding: "4px 12px",
  borderRadius: "100px",
  border: "1px solid #ffd0d2",
  marginRight: "6px",
  marginBottom: "6px",
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
};

const valueBold: React.CSSProperties = {
  margin: "0",
  fontSize: "15px",
  color: "#E01B24",
  fontWeight: "700",
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
