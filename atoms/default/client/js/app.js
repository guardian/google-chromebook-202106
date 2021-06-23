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
import { useEffect, useRef, useState } from "preact/hooks";
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
    const link = useSelector(s=>s.sheets.global[0].logoLink);
    
    return (
        <FlexContainer className="paid-for fl-col" >
            <p>Paid for by</p>
            <a href={link} target='_blank'><img src='<%= path %>/logo.svg' width="230"/></a>
        </FlexContainer>
    )
}

const setHtml = (html) => ({__html: html});

const Header = () => {
    const globalData = useSelector(s=>s.sheets.global[0]);

    useEffect(() => {
        gsap.from('.title',{duration: 1, y: 20, alpha: 0, delay: 3});
    },[])
    return (
        <header>
            <LoopingBgVid src='hero.mp4' />
            <FlexContainer className="fl-col fl-space-between">
                <PaidForBy/>
                <h1 className="title" dangerouslySetInnerHTML={setHtml(globalData.headline)}></h1>
                {/* <h1>
                ‘It all comes back to holy basil’: <br/>
                <span class="sub">how Palisa Anderson’s farm and community helped save her restaurant</span>
                </h1> */}
            </FlexContainer>
        </header>
    )
}

const Panel = ({className, children}) => <div className={`panel ${className}`}>{children}</div>;

const ImagePanel = ({className, children, image}) => {
    const bgRef = useRef();

    useEffect(()=>{
        ScrollTrigger.create({
            trigger: bgRef.current,
            start: "top bottom",
            animation: gsap.to(bgRef.current, {scale: 1.1}),
            scrub: true
          });
    },[]);

    return <Panel className="image-panel">
        <div className="bg-container" style={{backgroundImage: `url(${image})`}} ref={bgRef}>
            {children && 
            <Container>
                {children}
            </Container>
            }
        </div>
    </Panel>
}

const AudioSection = () => 
    <Container>
        <div className="audio-article">

        </div>
    </Container>

const CenterPara = ({className, children}) => 
    <div className="center-para">
        {children}
    </div>

const LoopingBgVid = ({src, image}) => 
    <div className="video-bg">
        {image &&
        <div className="image" style={{backgroundImage: `url(<%= path %>/${image})`}} ></div>
        }
        {src && 
        <video src={`<%= path %>/${src}`} loop muted='true' autoPlay width="400" height="200" playsInline></video>
        }
    </div>

const Youtube = ({videoId, title = 'Youtube player'}) =>
    <div className="yt-vid">
        <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

const Loading = () => 
    <FlexContainer className="loading">
        <img src='<%= path %>/logo.svg' width="300"/>
    </FlexContainer>

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    const mainRef = useRef();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/11f3uHy47SIqKvRkS0EAuE3nOVoYpkbkV7cLnOufgo7s.json') );
    },[]);

    if (!loaded) {
        return <Loading />;
    } else {
        const contentData = useSelector(s=>s.sheets.content);
        const cta = useSelector(s=>s.sheets.global[0].cta);
        const globalData = useSelector(s=>s.sheets.global[0]);
        const relatedItems = useSelector(s=>s.sheets.related);
        const [data, setData] = useState({});

        const relatedList = relatedItems.map(v=>
            <li>
                <a href={v.link}>
                    <img src={`<%= path %>/${v.image}`} alt=""/>
                    <div dangerouslySetInnerHTML={setHtml(v.content)}></div>
                </a>
            </li>);

        useEffect(() => {
            const d = {cta};
            contentData.forEach(v => d[v.key] = v.content)

            setData(d);
            gsap.to(mainRef.current, {delay: 0.5, duration: 2, alpha: 1, ease: 'sine.out'});

            
        }, [])
        return (
            <main ref={mainRef}>
                <Header />
                <section>
                    <PaddedContainer>
                        <CenterPara>
                            <div dangerouslySetInnerHTML={setHtml(data['block1'])}></div>
                        </CenterPara>          

                        <Youtube videoId={data.ytvid1} title="Youtube video" />
                        <CenterPara>
                            <div dangerouslySetInnerHTML={setHtml(data['block2'])}></div>
                        </CenterPara>
                    </PaddedContainer>
                    <ImagePanel image="<%= path %>/shopfront.jpg" />
                    <PaddedContainer>
                        <CenterPara>
                            <div dangerouslySetInnerHTML={setHtml(data['block3'])}></div>
                        </CenterPara>                                         
                        <div className="row">
                            <div className="col-50 p-rel">
                                <div className="min-h">
                                    <LoopingBgVid src="computer.mp4" />

                                </div>
                                <small dangerouslySetInnerHTML={setHtml(data['caption1'])}></small>
                            </div>
                            <div className="col-50">
                                <div dangerouslySetInnerHTML={setHtml(data['block4'])}></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                <div dangerouslySetInnerHTML={setHtml(data['block5'])}></div>
                            </div>
                            <div className="col-50 p-rel">
                                <div className="min-h">
                                    <LoopingBgVid image="boon-001.jpg" />

                                </div>
                            </div>
                        </div>


                        <div className="audio">
                            <div className="title">
                                <div dangerouslySetInnerHTML={setHtml(data['audio1Cap'])}></div>
                            </div>
                            <div className="player-body">
                                <AudioPlayer src={`<%= path %>/audio/${data.audio1}`} />
                            </div>

                        </div>
                    </PaddedContainer>
                    <ImagePanel image="<%= path %>/produce.jpg">
                        <div dangerouslySetInnerHTML={setHtml(data['imagePanel1'])}></div>
                    </ImagePanel>
                    <PaddedContainer>                        
                        <div className="row">
                            <div className="col-50 p-rel">
                                <div dangerouslySetInnerHTML={setHtml(data['block6'])}></div>
                                <div className="min-h">
                                    <LoopingBgVid src="kitchen.mp4" />

                                </div>
                                
                            </div>
                            <div className="col-50">
                                <div className="min-h">
                                    <LoopingBgVid image="boon-003.jpg" />

                                </div>
                                <small dangerouslySetInnerHTML={setHtml(data['caption2'])}></small>

                                <div dangerouslySetInnerHTML={setHtml(data['block7'])}></div>
                            </div>
                        </div>
                        


                    
                        <div className="cta">
                            <div dangerouslySetInnerHTML={setHtml(data['cta'])}></div>            
                        </div>


                        <div className="break">
                            <hr/>
                            <hr/>
                            <hr/>
                            <hr/>
                        </div>

                        <SocialBar title={globalData.shareTitle} url={globalData.url} />
                    </PaddedContainer>

                </section>
                <footer>
                    <div className="container padded-container">
                        <h2>Related content</h2>
                        <ul className='list-unstyled related-list'>
                            {relatedList}
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
