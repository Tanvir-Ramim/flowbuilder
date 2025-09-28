import type {
  CodeData,
  HttpRequestData,
  NodeType,
  SMTPData,
  WebhookData,
} from "../types/AllTypes";

export const getNodeConfig = (type: NodeType) => {
  const baseConfig = {
    nodeProps: {
      style: {
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "10px",
        background: "white",
        minWidth: 150,
      },
    },
  };

  switch (type) {
    case "webhook":
      return {
        ...baseConfig,
        defaultData: {
          name: "Webhook",
          method: "POST",
          path: "/webhook",
        } as WebhookData,
      };

    case "code":
      return {
        ...baseConfig,
        defaultData: {
          name: "Code",
          language: "JavaScript",
          code: 'console.log("Hello World");',
        } as CodeData,
      };

    case "http":
      return {
        ...baseConfig,
        defaultData: {
          name: "HTTP Request",
          method: "GET",
          url: "https://api.example.com",
          headers: [],
          bodyMode: "none" as const,
          body: "",
        } as HttpRequestData,
      };

    case "smtp":
      return {
        ...baseConfig,
        defaultData: {
          name: "SMTP",
          host: "smtp.example.com",
          port: "587",
          username: "",
          from: "",
          to: "",
          subject: "",
          text: "",
          html: "",
        } as SMTPData,
      };

    default:
      return {
        ...baseConfig,
        defaultData: {},
      };
  }
};
