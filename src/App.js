import { StackNavigator } from 'react-navigation';
import RootScreen from './screens/RootScreen';
import DownloadOfflineDataScreen from './screens/DownloadOfflineDataScreen';
import LoadMapOfflineScreen from './screens/LoadMapOfflineScreen';
import DrawScreen from './screens/DrawScreen';

const App = StackNavigator({
    Root: { screen: RootScreen },
    DownloadMap: { screen: DownloadOfflineDataScreen },
    LoadMap: { screen: LoadMapOfflineScreen },
    DrawOnMap: { screen: DrawScreen }
});

export default App;