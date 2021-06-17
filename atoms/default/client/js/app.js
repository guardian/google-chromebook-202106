// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Brother from "./Brother";
import store, {fetchData} from "./store";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from "preact/hooks";
import AudioPlayer from "../../../../shared/js/AudioPlayer";


gsap.registerPlugin(ScrollTrigger);

const Container = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}
// const FlexContainer = (props) => {
const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}
const PaddedContainer = ({children, className}) => {
    return (
        <div className={`padded-container ${className}`} >
            {children}
        </div>
    )
}

const PaidForBy = () => {

    return (
        <FlexContainer className="paid-for fl-col" >
            <p>Paid for by</p>
            <img src='<%= path %>/logo.svg' width="230"/>
        </FlexContainer>
    )
}

const setHtml = (html) => ({__html: html});

const Header = () => {
    const globalData = useSelector(s=>s.sheets.global[0]);
    return (
        <header>
            <LoopingBgVid src='hero.mp4' />
            <FlexContainer className="fl-col fl-space-between">
                <PaidForBy/>
                {/* <h1 dangerouslySetInnerHTML={setHtml(globalData.headline)}></h1> */}
                <h1>
                ‘It all comes back to holy basil’: <br/>
                <span class="sub">how Palisa Anderson’s farm and community helped save her restaurant</span>
                </h1>
            </FlexContainer>
        </header>
    )
}

const Panel = ({className, children}) => <div className={`panel ${className}`}>{children}</div>;

const ImagePanel = ({className, children, image}) => 
    <Panel className="image-panel">
        <div className="bg-container" style={{backgroundImage: `url(${image})`}}>
            {children && 
            <Container>
                {children}
            </Container>
            }
        </div>
    </Panel>


const AudioSection = () => 
    <Container>
        <div className="audio-article">

        </div>
    </Container>

const CenterPara = ({className, children}) => 
    <div className="center-para">
        {children}
    </div>

const LoopingBgVid = ({src}) => 
    <div className="video-bg">
        <video src={`<%= path %>/${src}`} loop muted='true' autoPlay width="400" height="200"></video>
    </div>

const Youtube = ({videoId, title = 'Youtube player'}) =>
    <div className="yt-vid">
        <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/11f3uHy47SIqKvRkS0EAuE3nOVoYpkbkV7cLnOufgo7s.json') );
    },[]);

    if (!loaded) {
        return (<h1>Loading...</h1>);
    } else {
        const contentData = useSelector(s=>s.sheets.content);
        const [data, setData] = useState({});

        useEffect(() => {
            const d = {};
            contentData.forEach(v => d[v.key] = v.content)
            setData(d);
            console.log(d);
        }, [])
        return (
            <main>
                <Header />
                <section>
                    <PaddedContainer>
                        <CenterPara>
                            <div  dangerouslySetInnerHTML={setHtml(data['p1'])}>

                            </div>
                            <p className="feature">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iste quam rerum qui at perferendis doloribus molestias magnam, necessitatibus sapiente atque beatae voluptate reiciendis impedit odit explicabo, iusto soluta exercitationem!</p>
                            <p>Commodi autem hic inventore corrupti odio dolor ea, magnam maxime eius veniam dolore repellendus soluta laudantium ab saepe. Inventore provident ratione ex repellendus minima corporis accusantium deserunt repudiandae corrupti necessitatibus.</p>
                            <p>Nemo reiciendis nulla minus culpa voluptatem dolorem sit accusamus soluta consequuntur. Modi libero perspiciatis dolorum excepturi voluptate, a, aperiam, pariatur odio ad quo quia quae autem fugit cum quod facilis.</p>
                            <p>Officia quas fugit dolorum. Quas tempore sint inventore quia deleniti quis explicabo iste commodi consectetur distinctio exercitationem suscipit nesciunt error non officia iure earum, vel aut assumenda? Expedita, similique at.</p>
                            <br/>
                            <p className="feature"><span className="hl">Watch:</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus error exercitationem laudantium dolore corrupti.</p>
                        </CenterPara>          

                        <Youtube videoId="qMtcWqCL_UQ" title="Hello" />
                        <CenterPara>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iste quam rerum qui at perferendis doloribus molestias magnam, necessitatibus sapiente atque beatae voluptate reiciendis impedit odit explicabo, iusto soluta exercitationem!</p>
                            <p>Commodi autem hic inventore corrupti odio dolor ea, magnam maxime eius veniam dolore repellendus soluta laudantium ab saepe. Inventore provident ratione ex repellendus minima corporis accusantium deserunt repudiandae corrupti necessitatibus.</p>
                            <p>Nemo reiciendis nulla minus culpa voluptatem dolorem sit accusamus soluta consequuntur. Modi libero perspiciatis dolorum excepturi voluptate, a, aperiam, pariatur odio ad quo quia quae autem fugit cum quod facilis.</p>
                            <p>Officia quas fugit dolorum. Quas tempore sint inventore quia deleniti quis explicabo iste commodi consectetur distinctio exercitationem suscipit nesciunt error non officia iure earum, vel aut assumenda? Expedita, similique at.</p>
                        </CenterPara>
                    </PaddedContainer>
                    <ImagePanel image="<%= path %>/shopfront.jpg" />
                    <PaddedContainer>
                        <CenterPara>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iste quam rerum qui at perferendis doloribus molestias magnam, necessitatibus sapiente atque beatae voluptate reiciendis impedit odit explicabo, iusto soluta exercitationem!</p>
                            <p>Commodi autem hic inventore corrupti odio dolor ea, magnam maxime eius veniam dolore repellendus soluta laudantium ab saepe. Inventore provident ratione ex repellendus minima corporis accusantium deserunt repudiandae corrupti necessitatibus.</p>
                            <p>Nemo reiciendis nulla minus culpa voluptatem dolorem sit accusamus soluta consequuntur. Modi libero perspiciatis dolorum excepturi voluptate, a, aperiam, pariatur odio ad quo quia quae autem fugit cum quod facilis.</p>
                            <p>Officia quas fugit dolorum. Quas tempore sint inventore quia deleniti quis explicabo iste commodi consectetur distinctio exercitationem suscipit nesciunt error non officia iure earum, vel aut assumenda? Expedita, similique at.</p>
                        </CenterPara>                                         
                        <div className="row">
                            <div className="col-50 p-rel">
                                <div className="min-h">
                                    <LoopingBgVid src="computer.mp4" />

                                </div>
                                <small>Palisa  turns to her Chromebook to help run her business. From the Everything button that gives quick answers to questions like 'best growing conditions for Holy Basil' or ‘weather forecast’ for the farm, to selling Boon Luck Farm’s produce online, things are simply easier with a little help from Chromebook.</small>
                            </div>
                            <div className="col-50">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nihil repellat velit dolor eum itaque quia omnis blanditiis voluptatibus ratione provident sit voluptatem, earum ipsa veritatis non aliquid reprehenderit iste!</p>
                                <p>Ipsa eligendi id consectetur cumque ducimus veritatis delectus repellat alias corrupti, ab rem molestias quas itaque recusandae architecto non facilis esse accusantium optio a laboriosam nisi molestiae? Veritatis, molestias nostrum.</p>
                                <p>Beatae quibusdam unde, odio optio, commodi necessitatibus sint obcaecati quisquam natus dolores expedita ea culpa sequi quidem dignissimos, consequatur aperiam tempore nulla. Tempore corrupti qui quia eveniet mollitia labore magni.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nihil repellat velit dolor eum itaque quia omnis blanditiis voluptatibus ratione provident sit voluptatem, earum ipsa veritatis non aliquid reprehenderit iste!</p>
                                <p>Ipsa eligendi id consectetur cumque ducimus veritatis delectus repellat alias corrupti, ab rem molestias quas itaque recusandae architecto non facilis esse accusantium optio a laboriosam nisi molestiae? Veritatis, molestias nostrum.</p>
                                <p>Beatae quibusdam unde, odio optio, commodi necessitatibus sint obcaecati quisquam natus dolores expedita ea culpa sequi quidem dignissimos, consequatur aperiam tempore nulla. Tempore corrupti qui quia eveniet mollitia labore magni.</p>
                            </div>
                            <div className="col-50 p-rel">
                                <div className="min-h">
                                    <LoopingBgVid src="kitchen.mp4" />

                                </div>
                            </div>
                        </div>


                        <div className="audio">
                            <div className="title">Lorem ipsum dolor sit amet.</div>
                            <div className="player-body">
                                <AudioPlayer src="<%= path %>/audio/up.mp3" />
                            </div>

                        </div>
                    </PaddedContainer>
                    <ImagePanel image="<%= path %>/produce.jpg">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis sequi dolor laudantium debitis necessitatibus nam, molestias architecto facere iure ullam eius molestiae similique, placeat iste hic error et, voluptate aliquam!</p>
                    </ImagePanel>
                    <PaddedContainer>                        
                        <div className="row">
                            <div className="col-50 p-rel">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, vel voluptates facilis illo facere magni sapiente maxime eos architecto necessitatibus omnis eius nesciunt deleniti asperiores incidunt molestiae fugiat. Accusamus, ducimus?</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, vel voluptates facilis illo facere magni sapiente maxime eos architecto necessitatibus omnis eius nesciunt deleniti asperiores incidunt molestiae fugiat. Accusamus, ducimus?</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, vel voluptates facilis illo facere magni sapiente maxime eos architecto necessitatibus omnis eius nesciunt deleniti asperiores incidunt molestiae fugiat. Accusamus, ducimus?</p>
                                <div className="min-h">
                                    <LoopingBgVid src="computer.mp4" />

                                </div>
                                
                            </div>
                            <div className="col-50">
                                <div className="min-h">
                                    <LoopingBgVid src="kitchen.mp4" />

                                </div>
                                <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus harum, placeat vitae quo delectus reiciendis cumque excepturi voluptates. Vel iure dolorum consequatur aut? Magnam optio dolor eaque nostrum, perferendis odit.</small>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nihil repellat velit dolor eum itaque quia omnis blanditiis voluptatibus ratione provident sit voluptatem, earum ipsa veritatis non aliquid reprehenderit iste!</p>
                                <p>Ipsa eligendi id consectetur cumque ducimus veritatis delectus repellat alias corrupti, ab rem molestias quas itaque recusandae architecto non facilis esse accusantium optio a laboriosam nisi molestiae? Veritatis, molestias nostrum.</p>
                                <p>Beatae quibusdam unde, odio optio, commodi necessitatibus sint obcaecati quisquam natus dolores expedita ea culpa sequi quidem dignissimos, consequatur aperiam tempore nulla. Tempore corrupti qui quia eveniet mollitia labore magni.</p>
                            </div>
                        </div>
                        

                    </PaddedContainer>

                    
                    <div className="cta">
                        <p className="text-center feature">Discover how <a href="#">Chromebook</a> can help you move forward</p>
                    </div>


                    <div className="break">
                        <hr/>
                        <hr/>
                        <hr/>
                        <hr/>
                    </div>

                    <SocialBar />
                </section>
                <footer>
                    <div className="container">
                        <h2>Related content</h2>
                        <ul className='list-unstyled related-list'>
                            <li><img src="https://via.placeholder.com/300x200" alt=""/><p>Lorem ipsum dolor sit amet.</p></li>
                            <li><img src="https://via.placeholder.com/300x200" alt=""/><p>Lorem ipsum dolor sit amet.</p></li>
                        </ul>

                    </div>
                </footer>
            </main>
        );
    }
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));
