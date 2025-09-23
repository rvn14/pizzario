import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Row,
  Column,
  Hr,
} from "@react-email/components";

type CartItem = {
  id?: string;
  name?: string;
  size?: string;
  price?: number;
  quantity?: number;
};

type Props = {
  items?: CartItem[];
  orderId?: string;
  customerName?: string;
  address?: string;
  subtotal?: number;
  taxes?: number;
  totalPrice?: number;
};

export default function Order(props: Props = {}) {
  const items: CartItem[] = Array.isArray(props.items) ? props.items : [];

  const subtotal = props.subtotal ?? items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  const taxes = props.taxes ?? +(subtotal * 0.07).toFixed(2);
  const total = props.totalPrice ?? +(subtotal + taxes).toFixed(2);

  const formatPrice = (n: number) => `$${n.toFixed(2)} USD`;

  const colors = {
    wood900: "#2b2a28",
    wood300: "#f3efe6",
    woodText: "#1f1f1f",
    amber: "#d97706",
    white: "#ffffff",
  };

  return (
    <Html>
      <Head />
      <Preview>Order confirmation{props.orderId ? ` — #${props.orderId}` : ""}</Preview>
      <Body style={{ backgroundColor: colors.white, fontFamily: "Inter, Arial, sans-serif", margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Container style={{ margin: "0 auto", padding: 20, maxWidth: 600, backgroundColor: colors.white, borderRadius: 6 }}>
          <Section style={{ backgroundColor: colors.wood900, padding: "18px 20px", borderRadius: 6 }}>
            <Heading style={{ margin: 0, color: colors.white, fontSize: 20 }}>Pizzario — Order Confirmation</Heading>
            {props.orderId && (
              <Text style={{ color: colors.white, opacity: 0.85, marginTop: 6, fontSize: 13 }}>
                Order #{props.orderId}
              </Text>
            )}
          </Section>

          <Section style={{ padding: "18px 0 8px 0" }}>
            <Text style={{ color: colors.woodText, margin: 0 }}>Hello {props.customerName || "Customer"},</Text>
            <Text style={{ color: colors.woodText, margin: "8px 0 0 0" }}>Thank you for your order. Below are the details:</Text>
          </Section>

          <Section style={{ padding: "12px 0" }}>
            {items.length === 0 ? (
              <Text style={{ color: colors.woodText }}>No items in order.</Text>
            ) : (
              items.map((item, idx) => (
                <Row key={item.id || idx} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                  <Column style={{ width: "65%", paddingRight: 10 }}>
                    <Text
                      style={{
                        margin: 0,
                        color: colors.woodText,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        fontSize: 14,
                      }}
                    >
                      {item.name || "Item"}
                    </Text>
                    <Text style={{ margin: "4px 0 0 0", color: colors.woodText, fontSize: 12 }}>
                      {item.size ? `Size: ${item.size}` : null} {item.quantity ? `• Qty: ${item.quantity}` : ""}
                    </Text>
                  </Column>
                  <Column style={{ width: "35%", textAlign: "right" }}>
                    <Text style={{ margin: 0, color: colors.woodText, fontWeight: 700 }}>
                      {formatPrice((item.price || 0) * (item.quantity || 1))}
                    </Text>
                  </Column>
                </Row>
              ))
            )}
          </Section>

          <Section style={{ paddingTop: 12 }}>
            <Hr />
            <Row style={{ paddingTop: 12 }}>
              <Column style={{ width: "60%" }}>
                <Text style={{ margin: 0, color: colors.woodText }}>Subtotal</Text>
              </Column>
              <Column style={{ width: "40%", textAlign: "right" }}>
                <Text style={{ margin: 0, color: colors.woodText }}>{formatPrice(subtotal)}</Text>
              </Column>
            </Row>

            <Row style={{ paddingTop: 8 }}>
              <Column style={{ width: "60%" }}>
                <Text style={{ margin: 0, color: colors.woodText }}>Taxes</Text>
              </Column>
              <Column style={{ width: "40%", textAlign: "right" }}>
                <Text style={{ margin: 0, color: colors.woodText }}>{formatPrice(taxes)}</Text>
              </Column>
            </Row>

            <Row style={{ paddingTop: 12 }}>
              <Column style={{ width: "60%" }}>
                <Text style={{ margin: 0, color: colors.woodText, fontWeight: 700 }}>Total</Text>
              </Column>
              <Column style={{ width: "40%", textAlign: "right" }}>
                <Text style={{ margin: 0, color: colors.woodText, fontWeight: 800, fontSize: 16 }}>{formatPrice(total)}</Text>
              </Column>
            </Row>
          </Section>

          {props.address && (
            <Section style={{ paddingTop: 14 }}>
              <Heading style={{ margin: "0 0 8px 0", fontSize: 14, color: colors.woodText }}>Delivery Address</Heading>
              <Text style={{ margin: 0, color: colors.woodText }}>{props.address}</Text>
            </Section>
          )}

          <Section style={{ paddingTop: 18, paddingBottom: 6 }}>
            <Button
              href="#"
              style={{
                backgroundColor: colors.amber,
                color: colors.white,
                borderRadius: 999,
                textDecoration: "none",
                display: "inline-block",
                fontWeight: 700,
                padding: "12px 24px",
              }}
            >
              View Order
            </Button>
          </Section>

          <Section style={{ paddingTop: 8 }}>
            <Text style={{ color: colors.woodText, fontSize: 12, opacity: 0.9 }}>
              If you have any questions about your order, reply to this email or contact our support.
            </Text>
            <Text style={{ color: colors.woodText, fontSize: 12, marginTop: 6 }}>
              Pizzario — Thank you for choosing us.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}