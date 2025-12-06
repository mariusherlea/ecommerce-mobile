import { Text, View } from "react-native";

type RichTextChild = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
};

type RichTextBlock = {
  type: string;
  children?: RichTextChild[];
  format?: string;
  level?: number; // For headings
  ordered?: boolean; // For lists
};

export default function RichText({ content }: { content: RichTextBlock[] }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <View style={{ marginVertical: 10 }}>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Text
                key={index}
                style={{
                  fontSize: 16,
                  marginBottom: 12,
                  lineHeight: 22,
                }}
              >
                {block.children?.map((child, idx) => renderChild(child, idx))}
              </Text>
            );

          case "heading":
            return (
              <Text
                key={index}
                style={{
                  fontSize:
                    block.level === 1
                      ? 32
                      : block.level === 2
                      ? 26
                      : block.level === 3
                      ? 22
                      : 18,
                  marginVertical: 10,
                  fontWeight: "700",
                }}
              >
                {block.children?.map((child, idx) => renderChild(child, idx))}
              </Text>
            );

          case "list":
            return (
              <View key={index} style={{ marginBottom: 10 }}>
                {block.children?.map((child, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      marginBottom: 6,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {block.ordered ? `${idx + 1}.` : "•"}
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 6 }}>
                      {child.text}
                    </Text>
                  </View>
                ))}
              </View>
            );

          case "quote":
            return (
              <Text
                key={index}
                style={{
                  fontStyle: "italic",
                  borderLeftWidth: 3,
                  borderLeftColor: "#999",
                  paddingLeft: 10,
                  marginVertical: 10,
                  opacity: 0.8,
                }}
              >
                {block.children?.map((child, idx) => renderChild(child, idx))}
              </Text>
            );

          default:
            return null;
        }
      })}
    </View>
  );
}

// 🎨 Helper pentru text cu bold/italic/underline/link
function renderChild(child: RichTextChild, key: number) {
  if (child.type !== "text") return null;

  return (
    <Text
      key={key}
      style={{
        fontWeight: child.bold ? "700" : "400",
        fontStyle: child.italic ? "italic" : "normal",
        textDecorationLine: child.underline ? "underline" : "none",
        color: child.url ? "#3366FF" : "black",
      }}
      onPress={
        child.url
          ? () => {
              // Poți adăuga Linking.openURL(child.url)
            }
          : undefined
      }
    >
      {child.text}
    </Text>
  );
}
