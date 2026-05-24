export type Category = 'cinema' | 'music' | 'literature' | 'architecture' | 'art'

export interface Recommendation {
  id: string
  title: string
  wikipediaTitle: string
  category: Category
}

export const categories: { id: Category; label: string; labelRu: string }[] = [
  { id: 'cinema', label: 'Cinema', labelRu: 'Кино' },
  { id: 'music', label: 'Music', labelRu: 'Музыка' },
  { id: 'literature', label: 'Literature', labelRu: 'Литература' },
  { id: 'architecture', label: 'Architecture', labelRu: 'Архитектура' },
  { id: 'art', label: 'Art', labelRu: 'Искусство' },
]

export const recommendations: Recommendation[] = [
  // Cinema
  { id: 'cinema-1', title: 'Stalker', wikipediaTitle: 'Stalker (film)', category: 'cinema' },
  { id: 'cinema-2', title: 'Solaris', wikipediaTitle: 'Solaris (1972 film)', category: 'cinema' },
  { id: 'cinema-3', title: 'Battleship Potemkin', wikipediaTitle: 'Battleship Potemkin', category: 'cinema' },
  { id: 'cinema-4', title: 'The Mirror', wikipediaTitle: 'The Mirror (1975 film)', category: 'cinema' },
  { id: 'cinema-5', title: 'Ivan the Terrible', wikipediaTitle: 'Ivan the Terrible (1944 film)', category: 'cinema' },
  { id: 'cinema-6', title: 'Man with a Movie Camera', wikipediaTitle: 'Man with a Movie Camera', category: 'cinema' },
  // Music
  { id: 'music-1', title: 'Shostakovich: Symphony No. 5', wikipediaTitle: 'Symphony No. 5 (Shostakovich)', category: 'music' },
  { id: 'music-2', title: 'Prokofiev: Romeo and Juliet', wikipediaTitle: 'Romeo and Juliet (Prokofiev)', category: 'music' },
  { id: 'music-3', title: 'Red Army Choir: Katyusha', wikipediaTitle: 'Alexandrov Ensemble', category: 'music' },
  { id: 'music-4', title: 'Mussorgsky: Pictures at an Exhibition', wikipediaTitle: 'Pictures at an Exhibition', category: 'music' },
  { id: 'music-5', title: 'Stravinsky: The Rite of Spring', wikipediaTitle: 'The Rite of Spring', category: 'music' },
  { id: 'music-6', title: 'Schnittke: Concerto Grosso No. 1', wikipediaTitle: 'Concerto Grosso No. 1 (Schnittke)', category: 'music' },
  // Literature
  { id: 'lit-1', title: 'The Master and Margarita', wikipediaTitle: 'The Master and Margarita', category: 'literature' },
  { id: 'lit-2', title: 'Crime and Punishment', wikipediaTitle: 'Crime and Punishment', category: 'literature' },
  { id: 'lit-3', title: 'One Day in the Life of Ivan Denisovich', wikipediaTitle: 'One Day in the Life of Ivan Denisovich', category: 'literature' },
  { id: 'lit-4', title: 'Doctor Zhivago', wikipediaTitle: 'Doctor Zhivago (novel)', category: 'literature' },
  { id: 'lit-5', title: 'Requiem by Anna Akhmatova', wikipediaTitle: 'Requiem (Anna Akhmatova)', category: 'literature' },
  { id: 'lit-6', title: 'And Quiet Flows the Don', wikipediaTitle: 'And Quiet Flows the Don', category: 'literature' },
  // Architecture
  { id: 'arch-1', title: 'Palace of the Soviets', wikipediaTitle: 'Palace of the Soviets', category: 'architecture' },
  { id: 'arch-2', title: 'Ostankino Tower', wikipediaTitle: 'Ostankino Tower', category: 'architecture' },
  { id: 'arch-3', title: 'Monument to the Conquerors of Space', wikipediaTitle: 'Monument to the Conquerors of Space', category: 'architecture' },
  { id: 'arch-4', title: 'Moscow Metro: Mayakovskaya', wikipediaTitle: 'Mayakovskaya (Moscow Metro)', category: 'architecture' },
  { id: 'arch-5', title: 'The Motherland Calls', wikipediaTitle: 'The Motherland Calls', category: 'architecture' },
  { id: 'arch-6', title: 'Tower of the USSR Pavilion', wikipediaTitle: 'USSR Pavilion at Expo 58', category: 'architecture' },
  // Art
  { id: 'art-1', title: 'Black Square by Malevich', wikipediaTitle: 'Black Square (painting)', category: 'art' },
  { id: 'art-2', title: 'El Lissitzky: Beat the Whites', wikipediaTitle: 'El Lissitzky', category: 'art' },
  { id: 'art-3', title: 'Worker and Kolkhoz Woman', wikipediaTitle: 'Worker and Kolkhoz Woman', category: 'art' },
  { id: 'art-4', title: 'Deyneka: Future Pilots', wikipediaTitle: 'Aleksandr Deyneka', category: 'art' },
  { id: 'art-5', title: 'Tatlin: Monument to the Third International', wikipediaTitle: 'Tatlin\'s Tower', category: 'art' },
  { id: 'art-6', title: 'Rodchenko: Posters', wikipediaTitle: 'Alexander Rodchenko', category: 'art' },
]

export function getRecommendationsForFloor(floorIndex: number, count: number = 3): Recommendation[] {
  const start = (floorIndex * count) % recommendations.length
  const result: Recommendation[] = []
  for (let i = 0; i < count; i++) {
    result.push(recommendations[(start + i) % recommendations.length])
  }
  return result
}

export function getRecommendationById(id: string): Recommendation | undefined {
  return recommendations.find((r) => r.id === id)
}
