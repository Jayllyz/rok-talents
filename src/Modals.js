import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Announcement from './Announcement';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  faExclamationTriangle,
  faInfoCircle,
  faTrashAlt,
  faShareAlt,
  faLink,
  faCode,
  faCopy,
  faBullhorn
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  WeiboShareButton,
  PocketShareButton,
  EmailShareButton,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  PocketIcon,
  EmailIcon,
  WeiboIcon
} from 'react-share';

import {
  title,
  author,
  contributors,
  // repository,
  bugs,
  version
} from '../package.json';
import { getURL } from './utils';
import './styles/Modals.css';

/**
 * Modal displaying warning about an invalid build retrived from URL
 *
 * @class InvalidBuildModal
 * @extends {Component}
 */
export class InvalidBuildModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="modal-icon"
            />
          </span>
          Invalid Talent Build
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            The talent build you're trying to view is invalid. Make sure you've
            copied and pasted the link correctly.
            <br />
            <br />
          </div>
          <div data-testid="invalid-modal-body">
            <b>Reason:</b> {this.props.message}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Modal displaying announcements
 *
 * @class AnnouncementModal
 * @extends {Component}
 */
export class AnnouncementModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:
        this.props.isEmbed || !this.props.isUpgrade || this.props.isInvalidBuild
          ? false
          : true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  show() {
    this.setState({ modal: true });
  }

  render() {
    return (
      <Modal
        data-testid="announce-modal"
        centered
        size="lg"
        show={this.state.modal}
        onHide={this.toggle}
      >
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon icon={faBullhorn} className="modal-icon" />
          </span>
          Announcement
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Announcement />
        </Modal.Body>
        <Modal.Footer>
          <span className="modal-reminder">
            ( You can view this announcement again on the info page
            <FontAwesomeIcon icon={faInfoCircle} className="modal-icon" />)
          </span>
          <Button variant="primary" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Modal displaying information about the application
 *
 * @class AboutModal
 * @extends {Component}
 */
export class AboutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modal !== nextState.modal) {
      return true;
    } else {
      return false;
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  getContributors() {
    let contributorsList = contributors.map((c, i) => [
      i > 0 && ', ',
      <a href={c.url} target="_blank" rel="noopener noreferrer" key={c.name}>
        {c.name}
      </a>
    ]);

    return contributorsList;
  }

  showDonate() {
    ReactGA.event({
      category: 'App',
      action: 'Donate'
    });
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon icon={faInfoCircle} className="modal-icon" />
          </span>
          {title}
        </Modal.Header>

        <Modal.Body>
          <Tabs defaultActiveKey="about" className="tab-title">
            <Tab eventKey="about" title="About">
              <div>
                <img
                  id="modal-app-icon"
                  src={`${process.env.PUBLIC_URL}/logo192.png`}
                  alt="RoK Talents Logo"
                ></img>
                Talent builder for Rise of Kingdoms. Best viewed on PC/laptop.
              </div>
              <br />
              <div>
                <span className="about-label">App version:</span> {version}
              </div>
              <div>
                <span className="about-label">Creator:</span>{' '}
                <a href={author.url} target="_blank" rel="noopener noreferrer">
                  {author.name}
                </a>
              </div>
              <div>
                <span className="about-label">Contributors:</span>{' '}
                {this.getContributors()}
              </div>
              {/* <div>
                <span className="about-label">Code:</span>{' '}
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div> */}
              <div>
                <span className="about-label">Report bug:</span>{' '}
                <a href={bugs.url} target="_blank" rel="noopener noreferrer">
                  Submit
                </a>
              </div>
              <div>
                <span className="about-label">Support development:</span>{' '}
                <a
                  href="https://www.buymeacoffee.com/simonho"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    id="coffee"
                    src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
                    alt="Buy Me A Coffee"
                    onClick={this.showDonate}
                  ></img>
                </a>
              </div>
            </Tab>

            <Tab eventKey="releases" title="Releases">
              <Button
                id="button-releases"
                variant="success"
                size="sm"
                onClick={() => {
                  this.toggle();
                  this.props.toggleAnnounce();
                }}
              >
                View latest release
              </Button>
            </Tab>

            <Tab eventKey="instructions" title="Instructions">
              <ol>
                <li>Choose commander in the top-right dropdown list</li>
                <li>Assign points by clicking on talent nodes</li>
                <li>Check your build stats in the Stats panel</li>
                <li>
                  Click the Share button to get a{' '}
                  <strong>shareable link</strong> to your build
                </li>
              </ol>
              <Button
                id="button-tour"
                variant="success"
                size="sm"
                onClick={() => {
                  this.toggle();
                  this.props.toggleTour();
                }}
              >
                Show Guided Tour
              </Button>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
}

/**
 * Modal displaying reset/delete confirmation
 *
 * @class ResetModal
 * @extends {Component}
 */
export class ResetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modal !== nextState.modal) {
      return true;
    } else {
      return false;
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon icon={faTrashAlt} className="modal-icon" />
          </span>
          Reset
        </Modal.Header>

        <Modal.Body className="modal-body">
          <div>Are you sure you want to reset the talent build?</div>
          <div>This will remove all assigned talent points.</div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              this.props.resetTalents();
              this.toggle();
            }}
          >
            Reset
          </Button>
          <Button variant="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

/**
 * Modal displaying sharing options for talent build
 *
 * @class ShareModal
 * @extends {Component}
 */
export class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modal !== nextState.modal) {
      return true;
    } else {
      return false;
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  copyURL() {
    const input = document.getElementById('url');
    input.readOnly = true;
    input.select();
    document.execCommand('copy');
    document.getElementById('copyButton').innerHTML = '\u2713';
    ReactGA.event({
      category: 'Share',
      action: 'Copy URL'
    });
  }

  copyEmbedURL() {
    const input = document.getElementById('url-embed');
    input.readOnly = true;
    input.select();
    document.execCommand('copy');
    document.getElementById('copyEmbedButton').innerHTML = '\u2713';
    ReactGA.event({
      category: 'Share',
      action: 'Copy Embed URL'
    });
  }

  shareSocial() {
    ReactGA.event({
      category: 'Share',
      action: 'Share social media'
    });
  }

  render() {
    return (
      <Modal centered show={this.state.modal} onHide={this.toggle}>
        <Modal.Header closeButton>
          <span>
            <FontAwesomeIcon icon={faShareAlt} className="modal-icon" />
          </span>
          Share Talent Build
        </Modal.Header>

        <Modal.Body>
          <Tabs defaultActiveKey="link" className="tab-title">
            <Tab eventKey="link" title="Link">
              <div className="share-modal-label">
                Shareable link to this talent build:
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLink} />
                  </span>
                </div>
                <input
                  id="url"
                  type="text"
                  className="form-control"
                  defaultValue={getURL()}
                  readOnly
                ></input>
                <div className="input-group-append">
                  <button
                    id="copyButton"
                    className="btn btn-success"
                    type="button"
                    onClick={this.copyURL}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              </div>

              <hr />

              <div className="share-modal-label">Share to social media:</div>

              <div id="share-modal-social" onClick={this.shareSocial}>
                <EmailShareButton url={window.location.href}>
                  <EmailIcon size={32} round />
                </EmailShareButton>
                <RedditShareButton url={window.location.href}>
                  <RedditIcon size={32} round />
                </RedditShareButton>
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WeiboShareButton url={window.location.href}>
                  <WeiboIcon size={32} round />
                </WeiboShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <PocketShareButton url={window.location.href}>
                  <PocketIcon size={32} round />
                </PocketShareButton>
              </div>
            </Tab>

            <Tab eventKey="embed" title="Embed">
              <div>
                If you have a blog or website, you can use the{' '}
                <strong>HTML</strong> code below to embed this talent build
                directly into your site.
              </div>
              <div>
                <strong>Note</strong>: The embedded talent build will be
                view-only.
              </div>
              <br />

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faCode} />
                  </span>
                </div>
                <textarea
                  id="url-embed"
                  className="form-control"
                  rows={5}
                  defaultValue={`<iframe height="400" width="400" allowfullscreen="true" sandbox="allow-scripts allow-modals allow-same-origin allow-popups allow-popups-to-escape-sandbox" src="${getURL(
                    true
                  )}"></iframe>`}
                  readOnly
                ></textarea>
                <div className="input-group-append">
                  <button
                    id="copyEmbedButton"
                    className="btn btn-success"
                    type="button"
                    onClick={this.copyEmbedURL}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.toggle}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default {
  InvalidBuildModal,
  AnnouncementModal,
  AboutModal,
  ResetModal,
  ShareModal
};
