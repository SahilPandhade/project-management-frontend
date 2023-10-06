import React from 'react'
import AddClientsModal from '../components/AddClientsModal'
import Projects from '../components/Projects'
import Clients from '../components/Clients'
import AddProjectModal from '../components/AddProjectModal'
const Home = () => {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientsModal />
                <AddProjectModal/>
            </div>
            <Projects />
            <hr/>
            <Clients />

        </>
    )
}

export default Home