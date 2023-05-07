import { Button, Linking, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import { useCallback, useEffect, useState } from 'react';
import { crawlFithouService } from '../../services/fithou';

const OpenURLButton = ({ url, children, navigation }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      // await Linking.openURL(url);
      navigation.navigate("webview", {
        url,
      });
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const FithouArticlesScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await crawlFithouService();
      setArticles(result);
    })();
  }, []);
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        {articles &&
          articles?.map((article, index) => (
            <View style={styles.article} key={article?.link || index}>
              <Text style={styles.title}>{article?.title}</Text>
              <OpenURLButton url={`http://fithou.edu.vn${article?.link}`} navigation={navigation}>
                Xem bài viết
              </OpenURLButton>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};
export default FithouArticlesScreen;
