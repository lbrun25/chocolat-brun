'use client'

import { useRef, useMemo, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// Couleurs de l'emballage
const WRAPPER_COLOR = '#2d1810'
const TEXT_COLOR = '#d4c4a8'

// Création de la texture pour la face avant
function createFrontTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') {
    throw new Error('Document is not available')
  }
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 768
  const ctx = canvas.getContext('2d')!

  // Fond transparent (la couleur vient du matériau)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.translate(512, 280)

  // Dessiner la cabosse de cacao
  ctx.strokeStyle = TEXT_COLOR
  ctx.fillStyle = TEXT_COLOR
  ctx.lineWidth = 4

  // Corps de la cabosse
  ctx.beginPath()
  ctx.ellipse(0, 0, 75, 105, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Lignes verticales sur la cabosse
  for (let i = 0; i < 7; i++) {
    const x = -52 + (104 / 6) * i
    const curveOffset = Math.sin((i / 6) * Math.PI) * 14
    ctx.beginPath()
    ctx.moveTo(x, -95)
    ctx.quadraticCurveTo(x + curveOffset, 0, x, 95)
    ctx.stroke()
  }

  // Tige
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(28, -100)
  ctx.quadraticCurveTo(50, -120, 68, -112)
  ctx.stroke()

  // Feuille
  ctx.beginPath()
  ctx.moveTo(68, -112)
  ctx.quadraticCurveTo(110, -138, 120, -95)
  ctx.quadraticCurveTo(88, -100, 68, -112)
  ctx.fill()

  // Nervure
  ctx.strokeStyle = '#1a0f0a'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(73, -109)
  ctx.quadraticCurveTo(98, -112, 108, -100)
  ctx.stroke()

  ctx.restore()

  // Texte CHOCOLAT
  ctx.fillStyle = TEXT_COLOR
  ctx.font = 'bold 82px Georgia, "Times New Roman", serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('CHOCOLAT', 512, 560)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Création de la texture pour la face arrière
function createBackTexture(): THREE.CanvasTexture {
  if (typeof document === 'undefined') {
    throw new Error('Document is not available')
  }
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 768
  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = TEXT_COLOR
  ctx.textAlign = 'center'

  ctx.font = 'italic 40px Georgia, serif'
  ctx.fillText('Maître Artisan', 512, 160)

  ctx.font = 'bold 50px Georgia, serif'
  ctx.fillText('Pâtissier - Chocolatier', 512, 250)

  ctx.font = 'italic 64px Georgia, serif'
  ctx.fillText('Cédric Brun', 512, 370)

  ctx.strokeStyle = TEXT_COLOR
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  ctx.moveTo(280, 440)
  ctx.lineTo(744, 440)
  ctx.stroke()
  ctx.globalAlpha = 1

  ctx.font = '36px Georgia, serif'
  ctx.fillText('2 rue du chalet', 512, 520)

  ctx.font = 'bold 42px Georgia, serif'
  ctx.fillText('25140 CHARQUEMONT', 512, 600)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Géométrie du sachet de chocolat - forme coussin avec bords crimpés
function createPillowWrapperGeometry(): THREE.BufferGeometry {
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  // Dimensions
  const bodyWidth = 2.4
  const bodyHeight = 1.5
  const bodyDepth = 0.55
  const crimpWidth = 0.55
  const totalWidth = bodyWidth + 2 * crimpWidth

  const segmentsX = 32
  const segmentsY = 24
  const crimpSegments = 10

  let vertexIndex = 0

  // Fonction pour calculer la forme du coussin
  const pillowShape = (u: number, v: number): { pos: THREE.Vector3; normal: THREE.Vector3 } => {
    // u: 0 à 1 sur la largeur, v: 0 à 1 sur la hauteur
    const x = (u - 0.5) * bodyWidth
    const y = (v - 0.5) * bodyHeight

    // Bombement du coussin - plus bombé au centre
    const centerU = 1 - Math.pow(Math.abs(u - 0.5) * 2, 2)
    const centerV = 1 - Math.pow(Math.abs(v - 0.5) * 2, 2)
    const bulge = centerU * centerV * bodyDepth * 0.7

    // Aplatissement sur les bords
    const edgeFalloff = Math.min(
      Math.pow(Math.min(u, 1 - u) * 4, 0.8),
      1
    )

    const z = bulge * edgeFalloff

    // Normale approximative
    const nx = -centerV * (u - 0.5) * 0.5
    const ny = -centerU * (v - 0.5) * 0.3
    const nz = 1

    const normal = new THREE.Vector3(nx, ny, nz).normalize()

    return {
      pos: new THREE.Vector3(x, y, z),
      normal
    }
  }

  // Face avant du coussin
  for (let j = 0; j < segmentsY; j++) {
    for (let i = 0; i < segmentsX; i++) {
      const u1 = i / segmentsX
      const u2 = (i + 1) / segmentsX
      const v1 = j / segmentsY
      const v2 = (j + 1) / segmentsY

      const p1 = pillowShape(u1, v1)
      const p2 = pillowShape(u2, v1)
      const p3 = pillowShape(u2, v2)
      const p4 = pillowShape(u1, v2)

      const baseIdx = vertexIndex

      positions.push(
        p1.pos.x, p1.pos.y, p1.pos.z,
        p2.pos.x, p2.pos.y, p2.pos.z,
        p3.pos.x, p3.pos.y, p3.pos.z,
        p4.pos.x, p4.pos.y, p4.pos.z
      )

      normals.push(
        p1.normal.x, p1.normal.y, p1.normal.z,
        p2.normal.x, p2.normal.y, p2.normal.z,
        p3.normal.x, p3.normal.y, p3.normal.z,
        p4.normal.x, p4.normal.y, p4.normal.z
      )

      uvs.push(u1, v1, u2, v1, u2, v2, u1, v2)

      indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
      indices.push(baseIdx, baseIdx + 2, baseIdx + 3)

      vertexIndex += 4
    }
  }

  // Face arrière du coussin (miroir)
  for (let j = 0; j < segmentsY; j++) {
    for (let i = 0; i < segmentsX; i++) {
      const u1 = i / segmentsX
      const u2 = (i + 1) / segmentsX
      const v1 = j / segmentsY
      const v2 = (j + 1) / segmentsY

      const p1 = pillowShape(u1, v1)
      const p2 = pillowShape(u2, v1)
      const p3 = pillowShape(u2, v2)
      const p4 = pillowShape(u1, v2)

      // Inverser Z pour l'arrière
      p1.pos.z = -p1.pos.z
      p2.pos.z = -p2.pos.z
      p3.pos.z = -p3.pos.z
      p4.pos.z = -p4.pos.z

      const baseIdx = vertexIndex

      // Inverser l'ordre des vertices pour la normale
      positions.push(
        p2.pos.x, p2.pos.y, p2.pos.z,
        p1.pos.x, p1.pos.y, p1.pos.z,
        p4.pos.x, p4.pos.y, p4.pos.z,
        p3.pos.x, p3.pos.y, p3.pos.z
      )

      normals.push(
        -p2.normal.x, -p2.normal.y, -p2.normal.z,
        -p1.normal.x, -p1.normal.y, -p1.normal.z,
        -p4.normal.x, -p4.normal.y, -p4.normal.z,
        -p3.normal.x, -p3.normal.y, -p3.normal.z
      )

      uvs.push(1 - u2, v1, 1 - u1, v1, 1 - u1, v2, 1 - u2, v2)

      indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
      indices.push(baseIdx, baseIdx + 2, baseIdx + 3)

      vertexIndex += 4
    }
  }

  // Bords latéraux (haut et bas du coussin - connexion avant/arrière)
  for (let i = 0; i < segmentsX; i++) {
    const u1 = i / segmentsX
    const u2 = (i + 1) / segmentsX

    // Bord supérieur
    const pTopFront1 = pillowShape(u1, 1)
    const pTopFront2 = pillowShape(u2, 1)
    const pTopBack1 = pillowShape(u1, 1)
    const pTopBack2 = pillowShape(u2, 1)
    pTopBack1.pos.z = -pTopBack1.pos.z
    pTopBack2.pos.z = -pTopBack2.pos.z

    let baseIdx = vertexIndex
    positions.push(
      pTopFront1.pos.x, pTopFront1.pos.y, pTopFront1.pos.z,
      pTopFront2.pos.x, pTopFront2.pos.y, pTopFront2.pos.z,
      pTopBack2.pos.x, pTopBack2.pos.y, pTopBack2.pos.z,
      pTopBack1.pos.x, pTopBack1.pos.y, pTopBack1.pos.z
    )
    normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0)
    uvs.push(u1, 1, u2, 1, u2, 0, u1, 0)
    indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
    indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
    vertexIndex += 4

    // Bord inférieur
    const pBotFront1 = pillowShape(u1, 0)
    const pBotFront2 = pillowShape(u2, 0)
    const pBotBack1 = pillowShape(u1, 0)
    const pBotBack2 = pillowShape(u2, 0)
    pBotBack1.pos.z = -pBotBack1.pos.z
    pBotBack2.pos.z = -pBotBack2.pos.z

    baseIdx = vertexIndex
    positions.push(
      pBotBack1.pos.x, pBotBack1.pos.y, pBotBack1.pos.z,
      pBotBack2.pos.x, pBotBack2.pos.y, pBotBack2.pos.z,
      pBotFront2.pos.x, pBotFront2.pos.y, pBotFront2.pos.z,
      pBotFront1.pos.x, pBotFront1.pos.y, pBotFront1.pos.z
    )
    normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0)
    uvs.push(u1, 0, u2, 0, u2, 1, u1, 1)
    indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
    indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
    vertexIndex += 4
  }

  // Bords crimpés (zigzag fluide) - côté gauche et droit
  const addCrimpedEdge = (side: 'left' | 'right') => {
    const xStart = side === 'left' ? -bodyWidth / 2 : bodyWidth / 2
    const xEnd = side === 'left' ? -bodyWidth / 2 - crimpWidth : bodyWidth / 2 + crimpWidth
    const normalX = side === 'left' ? -1 : 1

    const crimpAmplitude = 0.08
    const numWaves = 8

    for (let j = 0; j < crimpSegments; j++) {
      const v1 = j / crimpSegments
      const v2 = (j + 1) / crimpSegments
      const y1 = (v1 - 0.5) * bodyHeight
      const y2 = (v2 - 0.5) * bodyHeight

      // Calcul de la profondeur du crimp (zigzag)
      const wave1 = Math.sin(v1 * numWaves * Math.PI) * crimpAmplitude
      const wave2 = Math.sin(v2 * numWaves * Math.PI) * crimpAmplitude

      // Points de départ (bord du coussin)
      const startDepth = bodyDepth * 0.3
      const p1Front: [number, number, number] = [xStart, y1, startDepth]
      const p2Front: [number, number, number] = [xStart, y2, startDepth]
      const p1Back: [number, number, number] = [xStart, y1, -startDepth]
      const p2Back: [number, number, number] = [xStart, y2, -startDepth]

      // Points d'arrivée (bord crimpé)
      const endDepth = 0.04
      const p3Front: [number, number, number] = [xEnd, y1, wave1 + endDepth]
      const p4Front: [number, number, number] = [xEnd, y2, wave2 + endDepth]
      const p3Back: [number, number, number] = [xEnd, y1, wave1 - endDepth]
      const p4Back: [number, number, number] = [xEnd, y2, wave2 - endDepth]

      // Face supérieure du crimp (avant)
      let baseIdx = vertexIndex
      if (side === 'left') {
        positions.push(...p3Front, ...p1Front, ...p2Front, ...p4Front)
      } else {
        positions.push(...p1Front, ...p3Front, ...p4Front, ...p2Front)
      }
      const n1: [number, number, number] = [normalX * 0.3, 0, 0.95]
      normals.push(...n1, ...n1, ...n1, ...n1)
      uvs.push(0, v1, 1, v1, 1, v2, 0, v2)
      indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
      indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
      vertexIndex += 4

      // Face inférieure du crimp (arrière)
      baseIdx = vertexIndex
      if (side === 'left') {
        positions.push(...p1Back, ...p3Back, ...p4Back, ...p2Back)
      } else {
        positions.push(...p3Back, ...p1Back, ...p2Back, ...p4Back)
      }
      const n2: [number, number, number] = [normalX * 0.3, 0, -0.95]
      normals.push(...n2, ...n2, ...n2, ...n2)
      uvs.push(1, v1, 0, v1, 0, v2, 1, v2)
      indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
      indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
      vertexIndex += 4

      // Bord extérieur du crimp
      baseIdx = vertexIndex
      if (side === 'left') {
        positions.push(...p3Back, ...p3Front, ...p4Front, ...p4Back)
      } else {
        positions.push(...p3Front, ...p3Back, ...p4Back, ...p4Front)
      }
      const nEdge: [number, number, number] = [normalX, 0, 0]
      normals.push(...nEdge, ...nEdge, ...nEdge, ...nEdge)
      uvs.push(0, v1, 1, v1, 1, v2, 0, v2)
      indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
      indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
      vertexIndex += 4
    }

    // Bord haut du crimp
    const startDepth = bodyDepth * 0.3
    const yTop = bodyHeight / 2
    const waveTop = Math.sin(1 * numWaves * Math.PI) * crimpAmplitude
    
    let baseIdx = vertexIndex
    const topPts = [
      [xStart, yTop, startDepth],
      [xEnd, yTop, waveTop + 0.04],
      [xEnd, yTop, waveTop - 0.04],
      [xStart, yTop, -startDepth]
    ]
    if (side === 'left') {
      positions.push(...topPts[0] as number[], ...topPts[1] as number[], ...topPts[2] as number[], ...topPts[3] as number[])
    } else {
      positions.push(...topPts[1] as number[], ...topPts[0] as number[], ...topPts[3] as number[], ...topPts[2] as number[])
    }
    normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0)
    uvs.push(0, 0, 1, 0, 1, 1, 0, 1)
    indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
    indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
    vertexIndex += 4

    // Bord bas du crimp
    const yBot = -bodyHeight / 2
    const waveBot = Math.sin(0 * numWaves * Math.PI) * crimpAmplitude
    
    baseIdx = vertexIndex
    const botPts = [
      [xStart, yBot, -startDepth],
      [xEnd, yBot, waveBot - 0.04],
      [xEnd, yBot, waveBot + 0.04],
      [xStart, yBot, startDepth]
    ]
    if (side === 'left') {
      positions.push(...botPts[0] as number[], ...botPts[1] as number[], ...botPts[2] as number[], ...botPts[3] as number[])
    } else {
      positions.push(...botPts[1] as number[], ...botPts[0] as number[], ...botPts[3] as number[], ...botPts[2] as number[])
    }
    normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0)
    uvs.push(0, 0, 1, 0, 1, 1, 0, 1)
    indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
    indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
    vertexIndex += 4
  }

  addCrimpedEdge('left')
  addCrimpedEdge('right')

  // Rainures verticales sur les crimps (lignes décoratives)
  const addCrimpGrooves = (side: 'left' | 'right') => {
    const xMid = side === 'left' ? -bodyWidth / 2 - crimpWidth * 0.5 : bodyWidth / 2 + crimpWidth * 0.5
    const grooveCount = 4
    const grooveWidth = 0.02
    const grooveDepth = 0.015

    for (let g = 0; g < grooveCount; g++) {
      const xOffset = (g - (grooveCount - 1) / 2) * 0.08
      const x = xMid + xOffset

      for (let j = 0; j < crimpSegments; j++) {
        const v1 = j / crimpSegments
        const v2 = (j + 1) / crimpSegments
        const y1 = (v1 - 0.5) * bodyHeight
        const y2 = (v2 - 0.5) * bodyHeight

        const wave1 = Math.sin(v1 * 8 * Math.PI) * 0.08
        const wave2 = Math.sin(v2 * 8 * Math.PI) * 0.08

        // Petite rainure
        const baseIdx = vertexIndex
        positions.push(
          x - grooveWidth, y1, wave1 + grooveDepth,
          x + grooveWidth, y1, wave1 + grooveDepth,
          x + grooveWidth, y2, wave2 + grooveDepth,
          x - grooveWidth, y2, wave2 + grooveDepth
        )
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1)
        uvs.push(0, v1, 1, v1, 1, v2, 0, v2)
        indices.push(baseIdx, baseIdx + 1, baseIdx + 2)
        indices.push(baseIdx, baseIdx + 2, baseIdx + 3)
        vertexIndex += 4
      }
    }
  }

  addCrimpGrooves('left')
  addCrimpGrooves('right')

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  return geometry
}

// Composant wrapper 3D principal
function ChocolateWrapper() {
  const groupRef = useRef<THREE.Group>(null)
  const [textures, setTextures] = useState<{
    front: THREE.CanvasTexture | null
    back: THREE.CanvasTexture | null
  }>({ front: null, back: null })

  useEffect(() => {
    // Vérifier que le document est disponible avant de créer les textures
    if (typeof document === 'undefined') return
    
    try {
      setTextures({
        front: createFrontTexture(),
        back: createBackTexture(),
      })
    } catch (error) {
      console.error('Erreur lors de la création des textures:', error)
    }
  }, [])

  const geometry = useMemo(() => createPillowWrapperGeometry(), [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.35
    }
  })

  // Matériau principal avec reflets plastique
  const wrapperMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: WRAPPER_COLOR,
      metalness: 0.1,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
      envMapIntensity: 1.2,
    })
  }, [])

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Corps principal de l'emballage */}
        <mesh geometry={geometry} material={wrapperMaterial} />

        {/* Texture face avant */}
        {textures.front && (
          <mesh position={[0, 0, 0.001]}>
            <planeGeometry args={[2.1, 1.35]} />
            <meshPhysicalMaterial
              map={textures.front}
              transparent
              metalness={0.05}
              roughness={0.3}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
            />
          </mesh>
        )}

        {/* Texture face arrière */}
        {textures.back && (
          <mesh position={[0, 0, -0.001]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.1, 1.35]} />
            <meshPhysicalMaterial
              map={textures.back}
              transparent
              metalness={0.05}
              roughness={0.3}
              clearcoat={0.6}
              clearcoatRoughness={0.2}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

// Composant Canvas principal
export default function ChocolateWrapper3D() {
  return (
    <div className="w-full h-full min-h-[400px]" style={{ background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 35 }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 2, -5]} intensity={0.4} />
          <pointLight position={[0, 3, 3]} intensity={0.6} color="#fff5e0" />
          <spotLight
            position={[0, 5, 0]}
            intensity={0.4}
            angle={0.5}
            penumbra={1}
            color="#fffaf0"
          />

          <ChocolateWrapper />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}
