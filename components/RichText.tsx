import { Text, View } from "react-native";

type RichTextProps = {
  content: any;
};

export default function RichText({ content }: RichTextProps) {
  // 1️⃣ Dacă e string → randează corect
  if (typeof content === "string") {
    return <Text style={{ fontSize: 16 }}>{content}</Text>;
  }

  // 2️⃣ Dacă NU e array → nu randa nimic
  if (!Array.isArray(content)) {
    return null;
  }

  // 3️⃣ Rich text din Strapi
  return (
    <View style={{ marginTop: 10 }}>
      {content.map((block, index) => {
        const text =
          block?.children?.map((child: any) => child.text).join("") ?? "";

        if (!text) return null;

        return (
          <Text key={index} style={{ fontSize: 16, marginBottom: 8 }}>
            {text}
          </Text>
        );
      })}
    </View>
  );
}
