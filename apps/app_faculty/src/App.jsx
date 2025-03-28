import 'bootstrap/dist/css/bootstrap.min.css';
import { AppCanvas } from '@hrbolek/uoisfrontend-gql-shared'
import { Program } from '@jakubvf/uoisfrontend-faculty';

export const App = () => {
    return (
        <AppCanvas>
            <Program />
        </AppCanvas>
    )
}
