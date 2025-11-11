import React, { useEffect, useRef, useState } from 'react'

const VIDEO_SRC =
  'https://customer-67xx775vol0ady89.cloudflarestream.com/be263344315d6c59108740c453910770/downloads/default.mp4'

export default function App() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const firstFieldRef = useRef(null)

  function handleOpen(e) {
    e?.preventDefault()
    setSubmitted(false)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // Basic demo handling: log values and show a confirmation state
    const payload = Object.fromEntries(formData.entries())
    // Note: File inputs are not enumerable in Object.fromEntries if empty
    // We'll access the file separately to preserve it if present
    const videoFile = formData.get('workflowVideo')
    if (videoFile && typeof videoFile === 'object' && videoFile.name) {
      payload.workflowVideo = videoFile.name
    }
    console.log('Contact form submission:', payload)
    setSubmitted(true)
    // Keep the drawer open to show confirmation; you could also close it
  }

  // Close on ESC when open
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open])

  return (
    <div className="app">
      <section className="hero" aria-label="Scenic background video hero">
        <video
          className="hero-video"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          poster="data:image/gif;base64,R0lGODlhAQABAAAAACw="
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="brand">Fast Robo</div>
          <h1 className="title">
            Low-Cost Autonomous Robots
            <span className="accent"> For every industry</span>
          </h1>
          <p className="subtitle">
            Happy customers in retail, and 3PL industries. From single-use to multi-use, we have a robot for you.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={handleOpen}>Get in touch</button>
          </div>
        </div>
        <a className="scroll-indicator" href="#learn-more" aria-label="Scroll">
          <span />
        </a>
      </section>

      {/* Content section removed per request */}

      {/* Right-side contact drawer modal */}
      <div
        className={`contact-backdrop ${open ? 'show' : ''}`}
        onClick={handleClose}
        aria-hidden={!open}
      />
      <aside
        className={`contact-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
      >
        <header className="contact-header">
          <h3 id="contact-title">Get in touch</h3>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close contact form"
            onClick={handleClose}
          >
            ×
          </button>
        </header>

        {submitted ? (
          <div className="contact-confirm">
            <p>Thanks for reaching out. We’ll get back to you shortly.</p>
            <button className="btn primary" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref={firstFieldRef} id="name" name="name" type="text" required placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company">Company name</label>
              <input id="company" name="company" type="text" placeholder="Company Inc." />
            </div>

            <div className="form-group">
              <label htmlFor="workflowVideo">Workflow video (optional)</label>
              <input id="workflowVideo" name="workflowVideo" type="file" accept="video/*" />
            </div>

            <div className="form-group">
              <label htmlFor="workflowDescription">Workflow description (optional)</label>
              <textarea
                id="workflowDescription"
                name="workflowDescription"
                rows={4}
                placeholder="Describe the workflow you want automated"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional notes</label>
              <textarea id="notes" name="notes" rows={3} placeholder="Anything else we should know" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn primary">Submit</button>
              <button type="button" className="btn ghost" onClick={handleClose}>Cancel</button>
            </div>
          </form>
        )}
      </aside>
    </div>
  )
}
